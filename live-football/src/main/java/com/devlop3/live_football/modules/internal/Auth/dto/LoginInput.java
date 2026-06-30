package com.devlop3.live_football.modules.internal.Auth.dto;

import lombok.Data;

@Data
public class LoginInput {
  private String identifier;
  private String rawPassword;
}
