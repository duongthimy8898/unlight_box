package com.devlop3.sports_api.models;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public class ScorePart {
    private Integer home;
    private Integer away;
  }