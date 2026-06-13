package com.devlop3.sports_api.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devlop3.sports_api.models.Fixture;
import com.devlop3.sports_api.models.FixtureStatistics;
import com.devlop3.sports_api.repositories.FixtureRepository;
import com.devlop3.sports_api.repositories.FixtureStatisticsRepository;
import com.devlop3.sports_api.specifications.FixtureSpecifications;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

// import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping(path = "/fixtures")
public class FixturesController {
  @Autowired
  private FixtureRepository fixtureRepository;

  @Autowired
  private FixtureStatisticsRepository fixtureStatisticsRepository;

  @GetMapping(path = { "", "/" })
  public ResponseEntity<?> getFixtures(
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateTime,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fromDateTime,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime toDateTime,
      @RequestParam(required = false) Boolean isPlaying,
      @RequestParam(required = false) String status,
      @RequestParam(required = false) Long leagueId,
      @RequestParam(required = false) Long teamId,
      @RequestParam(defaultValue = "20") int limit) {
    Specification<Fixture> spec = (root, query, cb) -> cb.conjunction();
    if (date != null) {
      spec = spec.and(FixtureSpecifications.hasDate(date));
    } else if (dateTime != null) {
      spec = spec.and(FixtureSpecifications.hasDateTime(dateTime));
    } else if (fromDate != null && toDate != null) {
      spec = spec.and(FixtureSpecifications.hasDateBetween(fromDate, toDate));
    } else if (fromDateTime != null && toDateTime != null) {
      spec = spec.and(FixtureSpecifications.hasDateTimeBetween(fromDateTime, toDateTime));
    }
    spec = spec
        .and(FixtureSpecifications.isPlaying(isPlaying))
        .and(FixtureSpecifications.hasStatus(status))
        .and(FixtureSpecifications.hasLeague(leagueId))
        .and(FixtureSpecifications.hasTeam(teamId));

    List<Fixture> fixtures = fixtureRepository
        .findAll(spec, PageRequest.of(0, limit, Sort.by(Sort.Direction.ASC, "date"))).getContent();
    return ResponseEntity
        .ok(Map.of("code", 200, "message", "Truy vấn thành công", "results", fixtures, "total", fixtures.size()));
  }

  @GetMapping(path = "/{slug}")
  public ResponseEntity<?> GetOneBySlug(@PathVariable(name = "slug", required = true) String slug) {
    // Pageable pageable = PageRequest.of(0, limit);
    try {
      long fId = Long.parseLong(slug.split("-I")[1]);
      Optional<Fixture> fixtureOpt = fixtureRepository.findById(fId);
      if (!fixtureOpt.isPresent())
        return ResponseEntity.ok(Map.of("code", 404, "message", "Trận không tồn tại"));
      return ResponseEntity.ok(Map.of("code", 200, "message", "Truy vấn thành công", "result", fixtureOpt.get()));
    } catch (Exception ex) {
      return ResponseEntity.ok(Map.of("code", 500, "result", ex.getMessage()));
    }
  }

  @GetMapping(path = "/statistics")
  public ResponseEntity<?> GetStatisticsById(@RequestParam(required = true) Long fixtureId) {
    try {
      Optional<FixtureStatistics> fixtureStatisticsOpt = fixtureStatisticsRepository.findByFixtureId(fixtureId);
      if (!fixtureStatisticsOpt.isPresent())
        return ResponseEntity.ok(Map.of("code", 404, "message", "Trận không có dữ liệu"));
      return ResponseEntity
          .ok(Map.of("code", 200, "message", "Truy vấn thành công", "result", fixtureStatisticsOpt.get()));
    } catch (Exception ex) {
      return ResponseEntity.ok(Map.of("code", 500, "result", ex.getMessage()));
    }
  }

}
