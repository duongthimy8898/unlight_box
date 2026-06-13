package com.devlop3.sports_api.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devlop3.sports_api.models.League;
import com.devlop3.sports_api.repositories.LeagueRepository;

@RestController
@RequestMapping(path = "/leagues")
public class LeaguesController {
  @Autowired
  private LeagueRepository leagueRepository;

  @GetMapping(path = { "", "/" })
  public ResponseEntity<?> GetLeagues() {
    List<League> leagues = leagueRepository.findAll();
    return ResponseEntity
        .ok(Map.of("code", 200, "message", "Truy vấn thành công", "total", leagues.size(), "results", leagues));
  }

  @GetMapping(path = "/{id}")
  public ResponseEntity<?> GetOneLeague(@PathVariable Long id) {
    Optional<League> leagueOpt = leagueRepository.findById(id);
    League league = leagueOpt.orElse(null);
    if (league == null) {
      return ResponseEntity.ok(Map.of("code", 404, "message", "Không tìm thấy giải đấu"));
    }
    return ResponseEntity.ok(Map.of("code", 200, "message", "Truy vấn thành công", "result", league));
  }
}
