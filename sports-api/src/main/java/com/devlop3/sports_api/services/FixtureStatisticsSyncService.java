package com.devlop3.sports_api.services;

import com.devlop3.sports_api.models.*;
import com.devlop3.sports_api.repositories.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FixtureStatisticsSyncService {

  private final RestTemplate restTemplate;
  private final ObjectMapper objectMapper;

  private final FixtureRepository fixtureRepository;
  private final TeamRepository teamRepository;
  private final FixtureStatisticsRepository fixtureStatisticsRepository;
  private final FixtureTeamStatisticsRepository fixtureTeamStatisticsRepository;

  @Transactional
  public void syncAllAvailableFixtureStatistics() {
    List<Fixture> fixtures = fixtureRepository.findAllAvailableNotPageable();

    for (Fixture fixture : fixtures) {
      try {
        syncFixtureStatistics(fixture.getId());
      } catch (Exception ex) {
        ex.printStackTrace();
        System.out.println("❌ Lỗi fixture " + fixture.getId() + ": " + ex.getMessage());
      }
    }
  }

  public void syncFixtureStatistics(Long fixtureId) {
    String url = "https://v3.football.api-sports.io/fixtures/statistics?fixture=" + fixtureId;

    ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

    if (!response.getStatusCode().is2xxSuccessful()) {
      throw new RuntimeException("API call failed: " + response.getStatusCode());
    }

    try {
      JsonNode root = objectMapper.readTree(response.getBody());
      JsonNode statsArray = root.path("response");

      if (statsArray.isMissingNode() || !statsArray.isArray() || statsArray.size() == 0) {
        System.out.println("⚠ Fixture " + fixtureId + " không có thống kê nào → bỏ qua");
        return;
      }

      Fixture fixture = fixtureRepository.findById(fixtureId)
          .orElseThrow(() -> new RuntimeException("Fixture not found: " + fixtureId));

      FixtureStatistics fixtureStatistics = fixtureStatisticsRepository.findByFixtureId(fixtureId).orElse(null);

      if(fixtureStatistics == null) {
        fixtureStatistics = new FixtureStatistics();
        fixtureStatistics.setFixture(fixture);
      }

      FixtureTeamStatistics homeTeam = fixtureStatistics.getHomeTeamStatistics();
      FixtureTeamStatistics awayTeam = fixtureStatistics.getAwayTeamStatistics();
      homeTeam.getFixtureStatisticItems().clear();
      awayTeam.getFixtureStatisticItems().clear();

      fixtureTeamStatisticsRepository.save(homeTeam);
      fixtureTeamStatisticsRepository.save(awayTeam);
      fixtureStatistics.setHomeTeamStatistics(null);
      fixtureStatistics.setAwayTeamStatistics(null);
      fixtureStatisticsRepository.save(fixtureStatistics);

      List<FixtureTeamStatistics> teamStats = new ArrayList<>();
    
      for (JsonNode teamStatNode : statsArray) {
        JsonNode teamNode = teamStatNode.path("team");
        Long teamId = teamNode.path("id").asLong();

        Team team = teamRepository.findById(teamId)
            .orElseThrow(() -> new RuntimeException("Team not found: " + teamId));

        FixtureTeamStatistics teamStat = new FixtureTeamStatistics();
        teamStat.setTeam(team);

        List<FixtureStatisticItem> items = new ArrayList<>();
        for (JsonNode itemNode : teamStatNode.path("statistics")) {
          FixtureStatisticItem item = new FixtureStatisticItem();
          item.setType(itemNode.path("type").asText());

          JsonNode valueNode = itemNode.path("value");
          item.setValue(valueNode.isNull() ? null : valueNode.asText());

          item.setFixtureTeamStatistics(teamStat);
          items.add(item);
        }

        teamStat.setFixtureStatisticItems(items);
        teamStats.add(teamStat);
      }

      fixtureStatistics.setHomeTeamStatistics(teamStats.get(0));
      fixtureStatistics.setAwayTeamStatistics(teamStats.get(1));

      saveFixtureStatistics(fixtureStatistics);

    } catch (Exception ex) {
      throw new RuntimeException("Failed to parse or save fixture statistics", ex);
    }
  }

  @Transactional
  protected void saveFixtureStatistics(FixtureStatistics fixtureStatistics) {
    try {
      fixtureStatisticsRepository.save(fixtureStatistics);
    } catch (Exception ex) {
      System.out.println("❌ Lỗi khi lưu fixture statistics: " + ex.getMessage());
    }
  }
}
