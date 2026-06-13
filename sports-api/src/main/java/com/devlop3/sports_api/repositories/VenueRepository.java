package com.devlop3.sports_api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devlop3.sports_api.models.Venue;

public interface VenueRepository extends JpaRepository<Venue, Long> {
}