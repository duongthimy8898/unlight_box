package com.devlop3.sports_api.models;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FixturePeriod {

  @JsonIgnore
  private Integer first;

  @JsonIgnore
  private Integer second;

  @JsonProperty("1h_started_at_formatter")
  public LocalDateTime getH1StartedAtFormatter() {
    if (Objects.isNull(first))
      return null;
    else
      return Instant.ofEpochSecond(first)
          .atZone(ZoneId.of("Asia/Ho_Chi_Minh")).toLocalDateTime();
  }

  @JsonProperty("2h_started_at_formatter")
  public LocalDateTime getH2StartedAtFormatter() {
    if (Objects.isNull(second))
      return null;
    else
      return Instant.ofEpochSecond(second)
          .atZone(ZoneId.of("Asia/Ho_Chi_Minh")).toLocalDateTime();
  }
}