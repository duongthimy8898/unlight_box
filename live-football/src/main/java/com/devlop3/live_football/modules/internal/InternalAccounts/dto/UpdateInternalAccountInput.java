package com.devlop3.live_football.modules.internal.InternalAccounts.dto;

import com.devlop3.live_football.common.models.InternalAccount;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateInternalAccountInput {
  @Size(max = 100, message = "Email không quá 100 ký tự")
  private String email;
  
  @Size(max = 16, message = "SDT không quá 16 ký tự")
  private String phoneNumber;

  @Size(min = 8, max = 32, message = "Mật khẩu phải từ 8-32 ký tự")
  private String password;

  private String fullName;

  private String nickname;

  @NotNull
  private InternalAccount.Gender gender;

  private String avatarUrl;

  private String coverUrl;

  private String bio;

  @NotNull(message = "Role bắt buộc phải chỉ định")
  private InternalAccount.Role role;
}
