package com.devlop3.live_football.common.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devlop3.live_football.common.models.Resource;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
}