package com.devlop3.sports_api.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "fixture_team_statistics")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FixtureTeamStatistics {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "team_id", nullable = false)
  private Team team;

  @JsonIgnoreProperties("fixtureTeamStatistics")
  @OneToMany(mappedBy = "fixtureTeamStatistics", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<FixtureStatisticItem> fixtureStatisticItems;
}
