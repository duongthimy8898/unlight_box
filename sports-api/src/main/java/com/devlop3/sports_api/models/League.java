package com.devlop3.sports_api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class League {

  @Id
  private Long id;

  private String name;
  @JsonIgnore
  private String country;
  private String logo;
  @JsonIgnore
  private String flag;
  @JsonIgnore
  private Integer season;
  private String round;
  @JsonIgnore
  private Boolean standings;
}