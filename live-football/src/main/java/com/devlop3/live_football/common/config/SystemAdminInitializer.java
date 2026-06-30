package com.devlop3.live_football.common.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.devlop3.live_football.common.models.InternalAccount;
import com.devlop3.live_football.common.services.InternalAccountService;

@Configuration
public class SystemAdminInitializer {
  @Bean
  public CommandLineRunner initAdmin(InternalAccountService internalAccountService, PasswordEncoder passwordEncoder) {
    return args -> {
      String sysAdminUsername = "sys_ad";
      if (internalAccountService.findByUsername(sysAdminUsername).isEmpty()) {
        InternalAccount internalAccount = new InternalAccount();
        internalAccount.setUsername(sysAdminUsername);
        internalAccount.setRole(InternalAccount.Role.SYSTEM_ADMIN);
        internalAccount.setNickname("Administrator");
        internalAccount.setPassword(passwordEncoder.encode("sys_ad@123!"));
        internalAccountService.save(internalAccount);
        System.out.println("✅ Tài khoản admin đã được tạo.");
      } else {
        System.out.println("✅ Tài khoản admin đã tồn tại.");
      }
    };
  }
}
