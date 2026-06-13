package com.devlop3.sports_api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devlop3.sports_api.models.League;

public interface LeagueRepository extends JpaRepository<League, Long> {
}
