package com.devlop3.sports_api.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FixtureStatus {

  @Column(name = "status_long")
  private String longStatus;

  @Column(name = "status_short")
  private String shortStatus;

  private Integer elapsed;

  private Integer extra;
}
