package com.devlop3.sports_api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devlop3.sports_api.models.Score;

public interface ScoreRepository extends JpaRepository<Score, Long> {
   Optional<Score> findByFixtureId(Long fixtureId);
}