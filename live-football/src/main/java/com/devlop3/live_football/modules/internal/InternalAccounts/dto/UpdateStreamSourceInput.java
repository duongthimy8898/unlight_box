package com.devlop3.live_football.modules.internal.InternalAccounts.dto;

import lombok.Data;

@Data
public class UpdateStreamSourceInput {
  private String streamSourceSd;
  private String streamSourceHd;
  private String streamSourceFhd;
}
