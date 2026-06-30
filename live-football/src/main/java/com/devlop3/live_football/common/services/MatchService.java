package com.devlop3.live_football.common.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devlop3.live_football.common.models.Match;
import com.devlop3.live_football.common.repositories.MatchRepository;

@Service
public class MatchService {

  @Autowired
  private MatchRepository matchRepository;

  public List<Match> findAll() {
    return matchRepository.findAll();
  }

  public Optional<Match> findById(Long id) {
    return matchRepository.findById(id);
  }

  public Match save(Match match) {
    return matchRepository.save(match);
  }

  public void deleteById(Long id) {
    matchRepository.deleteById(id);
  }

  public void delete(Match match) {
    matchRepository.delete(match);
  }
}