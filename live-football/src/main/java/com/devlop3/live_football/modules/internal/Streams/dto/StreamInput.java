package com.devlop3.live_football.modules.internal.Streams.dto;

import com.devlop3.live_football.common.models.Stream;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StreamInput {

  @NotBlank(message = "Name is required")
  private String name;

  @NotNull(message = "Source Type is required")
  private Stream.SourceType sourceType;

  @NotBlank(message = "Source URL is required")
  private String sourceUrl;

}
