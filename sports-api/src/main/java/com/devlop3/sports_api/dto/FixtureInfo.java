package com.devlop3.sports_api.dto;

import lombok.Data;

@Data
  public class FixtureInfo {
    private Long id;
    private String referee;
    private String timezone;
    private String date;
    private Long timestamp;
    private PeriodDTO periods;
    private VenueDTO venue;
    private StatusDTO status;
  }