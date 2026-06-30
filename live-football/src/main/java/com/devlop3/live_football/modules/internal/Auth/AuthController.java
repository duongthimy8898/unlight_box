package com.devlop3.live_football.modules.internal.Auth;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devlop3.live_football.common.models.InternalAccount;
import com.devlop3.live_football.modules.internal.Auth.dto.LoginInput;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController("internal.authController")
@RequestMapping(path = "/internal/api/auth", produces = "application/json")
public class AuthController {

  private final PasswordEncoder passwordEncoder;

  @Autowired
  private AuthService authService;

  AuthController(PasswordEncoder passwordEncoder) {
    this.passwordEncoder = passwordEncoder;
  }

  @PostMapping("/login")
  public ResponseEntity<?> postLogin(@RequestBody LoginInput loginInput) {
    Optional<InternalAccount> accountOpt = authService.findByIdentifier(loginInput.getIdentifier());
    if (accountOpt.isEmpty())
      return ResponseEntity.ok(Map.of("code", 404, "message", "Không tìm thấy tài khoản"));

    if (!passwordEncoder.matches(loginInput.getRawPassword(), accountOpt.get().getPassword()))
      return ResponseEntity.ok(Map.of("code", 401, "message", "Sai mật khẩu"));

    return ResponseEntity.ok(Map.of("code", 200, "message", "Đăng nhập thành công", "accessToken", "DemoToken", "data", accountOpt));

  }

}
