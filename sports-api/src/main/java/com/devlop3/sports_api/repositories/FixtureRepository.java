package com.devlop3.sports_api.repositories;

import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.devlop3.sports_api.models.Fixture;

public interface FixtureRepository extends JpaRepository<Fixture, Long>, JpaSpecificationExecutor<Fixture> {

  @Query("""
          SELECT f FROM Fixture f
          WHERE f.date >= :startDate
          AND f.status.shortStatus IN ('NS', '1H', 'HT', '2H', 'ET', 'P', 'LIVE') ORDER BY f.date ASC
      """)
  Page<Fixture> findAllAvailableByDate(ZonedDateTime startDate, Pageable pageable);

  @Query("""
          SELECT f FROM Fixture f
          WHERE f.status.shortStatus IN ('NS', '1H', 'HT', '2H', 'ET', 'P', 'LIVE') ORDER BY f.date ASC
      """)
  Page<Fixture> findAllAvailable(Pageable pageable);

  @Query("""
          SELECT f FROM Fixture f
          WHERE f.status.shortStatus IN ('1H', 'HT', '2H', 'ET', 'BT', 'P', 'SUSP', 'INT', 'LIVE')
          ORDER BY f.date ASC
      """)
  List<Fixture> findAllAvailableNotPageable();

  // Optional<Fixture> findById(String slug);
}
