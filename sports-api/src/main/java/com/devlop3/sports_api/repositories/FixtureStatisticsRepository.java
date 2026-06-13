package com.devlop3.sports_api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devlop3.sports_api.models.FixtureStatistics;

@Repository
public interface FixtureStatisticsRepository extends JpaRepository<FixtureStatistics, Long> {
  Optional<FixtureStatistics> findByFixtureId(Long fixtureId);
}
