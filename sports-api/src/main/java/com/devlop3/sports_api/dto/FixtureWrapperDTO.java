package com.devlop3.sports_api.dto;

import lombok.Data;

@Data
public class FixtureWrapperDTO {
  private FixtureInfo fixture;
  private LeagueDTO league;
  private TeamWrapperDTO teams;
  private GoalDTO goals;
  private ScoreDTO score;
}