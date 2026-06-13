package com.devlop3.sports_api.services;

import java.time.ZonedDateTime;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.devlop3.sports_api.dto.FixtureWrapperDTO;
import com.devlop3.sports_api.dto.ScorePartDTO;
import com.devlop3.sports_api.models.Fixture;
import com.devlop3.sports_api.models.FixturePeriod;
import com.devlop3.sports_api.models.FixtureStatus;
import com.devlop3.sports_api.models.League;
import com.devlop3.sports_api.models.Score;
import com.devlop3.sports_api.models.ScorePart;
import com.devlop3.sports_api.models.Team;
import com.devlop3.sports_api.models.Venue;
import com.devlop3.sports_api.repositories.FixtureRepository;
import com.devlop3.sports_api.repositories.LeagueRepository;
import com.devlop3.sports_api.repositories.ScoreRepository;
import com.devlop3.sports_api.repositories.TeamRepository;
import com.devlop3.sports_api.repositories.VenueRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
// import com.google.gson.Gson;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class FixtureSyncService {
  private final RestTemplate restTemplate;
  private final FixtureRepository fixtureRepository;
  private final TeamRepository teamRepository;
  private final VenueRepository venueRepository;
  private final LeagueRepository leagueRepository;
  private final ScoreRepository scoreRepository;
  private final ObjectMapper objectMapper;
  // private static final Logger logger =
  // LoggerFactory.getLogger(FixtureSyncService.class);

  public void syncFixturesByDate(String date) throws JsonProcessingException {

    // Ví dụ: date = "2025-06-17"
    String url = "https://v3.football.api-sports.io/fixtures?date=" + date;

    ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
    // logger.info(new Gson().toJson(response));

    if (response.getStatusCode().is2xxSuccessful()) {
      JsonNode root = objectMapper.readTree(response.getBody());
      JsonNode fixtures = root.path("response");

      for (JsonNode fixtureNode : fixtures) {
        // System.out.println(fixtureNode);
        FixtureWrapperDTO dto = objectMapper.treeToValue(fixtureNode, FixtureWrapperDTO.class);

        // Upsert (tự động nhờ Spring Data JPA nếu ID đã tồn tại)
        try {
          saveFixture(dto);
        } catch (Exception ex) {
          ex.printStackTrace();
        }
      }
    } else {
      throw new RuntimeException("API error: " + response.getStatusCode());
    }
    ;
  }

  @Transactional
  private void saveFixture(FixtureWrapperDTO dto) {
    if (dto == null || dto.getFixture() == null || dto.getFixture().getId() == null) {
      System.out.println("❌ Fixture hoặc ID null → bỏ qua");
      return;
    }

    Long fixtureId = dto.getFixture().getId();

    // League
    League league = null;
    if (dto.getLeague() != null && dto.getLeague().getId() != null) {
      Long leagueId = dto.getLeague().getId();
      league = leagueRepository.findById(leagueId).orElseGet(() -> {
        League l = new League();
        l.setId(leagueId);
        return l;
      });
      BeanUtils.copyProperties(dto.getLeague(), league);
      leagueRepository.save(league);
    }

    // Venue
    Venue venue = null;
    if (dto.getFixture().getVenue() != null &&
        dto.getFixture().getVenue().getId() != null) {
      Long venueId = dto.getFixture().getVenue().getId();
      venue = venueRepository.findById(venueId).orElseGet(() -> {
        Venue v = new Venue();
        v.setId(venueId);
        return v;
      });
      BeanUtils.copyProperties(dto.getFixture().getVenue(), venue);
      venueRepository.save(venue);
    }

    // Home team
    Team homeTeam = null;
    if (dto.getTeams() != null && dto.getTeams().getHome() != null &&
        dto.getTeams().getHome().getId() != null) {
      Long homeTeamId = dto.getTeams().getHome().getId();
      homeTeam = teamRepository.findById(homeTeamId).orElseGet(() -> {
        Team t = new Team();
        t.setId(homeTeamId);
        return t;
      });
      BeanUtils.copyProperties(dto.getTeams().getHome(), homeTeam);
      teamRepository.save(homeTeam);
    }

    // Away team
    Team awayTeam = null;
    if (dto.getTeams() != null && dto.getTeams().getAway() != null &&
        dto.getTeams().getAway().getId() != null) {
      Long awayTeamId = dto.getTeams().getAway().getId();
      awayTeam = teamRepository.findById(awayTeamId).orElseGet(() -> {
        Team t = new Team();
        t.setId(awayTeamId);
        return t;
      });
      BeanUtils.copyProperties(dto.getTeams().getAway(), awayTeam);
      teamRepository.save(awayTeam);
    }

    // Upsert Fixture
    Fixture fixture = fixtureRepository.findById(fixtureId).orElseGet(() -> {
      Fixture f = new Fixture();
      f.setId(fixtureId);
      return f;
    });

    fixture.setReferee(dto.getFixture().getReferee());
    fixture.setTimezone(dto.getFixture().getTimezone());
    fixture.setTimestamp(dto.getFixture().getTimestamp());

    try {
      fixture.setDate(ZonedDateTime.parse(dto.getFixture().getDate()));
    } catch (Exception ex) {
      System.out.println("⚠ Không thể parse date: " + dto.getFixture().getDate());
    }

    if (dto.getFixture().getPeriods() != null) {
      fixture.setPeriods(new FixturePeriod(
          dto.getFixture().getPeriods().getFirst(),
          dto.getFixture().getPeriods().getSecond()));
    }

    if (dto.getFixture().getStatus() != null) {
      fixture.setStatus(new FixtureStatus(
          dto.getFixture().getStatus().getLongStatus(),
          dto.getFixture().getStatus().getShortStatus(),
          dto.getFixture().getStatus().getElapsed(),
          dto.getFixture().getStatus().getExtra()));
    }

    fixture.setLeague(league);
    fixture.setVenue(venue);
    fixture.setHomeTeam(homeTeam);
    fixture.setAwayTeam(awayTeam);
    fixture.setGoalsHome(dto.getGoals() != null ? dto.getGoals().getHome() : null);
    fixture.setGoalsAway(dto.getGoals() != null ? dto.getGoals().getAway() : null);

    try {
      fixtureRepository.saveAndFlush(fixture);
    } catch (Exception ex) {
      System.out.println("❌ Lỗi khi lưu fixture: " + ex.getMessage());
      return;
    }
    try {
      fixture = fixtureRepository.findById(fixtureId)
          .orElseThrow(() -> new RuntimeException("Không tìm thấy fixture trong DB"));
      Score score = scoreRepository.findByFixtureId(fixtureId).orElse(null);
      if (score == null) {
        score = new Score();
        // // ✅ BẮT BUỘC để Hibernate hiểu: đây là ID của
        // fixture đã có
      }
      // score.setFixtureId(fixtureId);
      score.setFixture(fixture);
      if (dto.getScore() != null) {
        score.setHalftime(toScorePart(dto.getScore().getHalftime()));
        score.setFulltime(toScorePart(dto.getScore().getFulltime()));
        score.setExtratime(toScorePart(dto.getScore().getExtratime()));
        score.setPenalty(toScorePart(dto.getScore().getPenalty()));
      }

      scoreRepository.save(score);
    } catch (Exception ex) {
      System.out.println("❌ Lỗi khi lưu score: " + ex.getMessage());
      return;
    }
  }

  private ScorePart toScorePart(ScorePartDTO dto) {
    if (dto == null)
      return new ScorePart(null, null);
    return new ScorePart(dto.getHome(), dto.getAway());
  }
}
