package com.devlop3.sports_api.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "fixture_statistic_item")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FixtureStatisticItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String type;
  
  private String value;

  @JsonIgnoreProperties("fixtureStatisticItem")
  @ManyToOne
  @JoinColumn(name = "fixture_team_statistics_id")
  private FixtureTeamStatistics fixtureTeamStatistics;
}
