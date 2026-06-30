package com.devlop3.live_football.modules.internal.InternalAccounts.dto;

import com.devlop3.live_football.common.models.InternalAccount;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AddInternalAccountInput {

  @NotBlank(message = "Tên đăng nhập không được bỏ trống")
  @Size(min = 6, max = 32, message = "Tên đăng nhập phải từ 6-32 ký tự")
  private String username;

  @Size(max = 100, message = "Email không quá 100 ký tự")
  private String email;

  @Size(max = 16, message = "SDT không quá 16 ký tự")
  private String phoneNumber;

  @NotBlank(message = "Mật khẩu không được bỏ trống")
  @Size(min = 8, max = 32, message = "Mật khẩu phải từ 8-32 ký tự")
  private String rawPassword;

  private String fullName;

  private String nickname;

  private InternalAccount.Gender gender;

  private String avatarUrl;

  private String coverUrl;

  private String bio;

  @NotNull(message = "Role bắt buộc phải chỉ định")
  private InternalAccount.Role role;
}
