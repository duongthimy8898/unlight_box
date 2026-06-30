package com.devlop3.live_football.modules.internal.InternalAccounts;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devlop3.live_football.common.models.InternalAccount;
import com.devlop3.live_football.common.services.InternalAccountService;
import com.devlop3.live_football.common.services.MatchService;
import com.devlop3.live_football.modules.internal.InternalAccounts.dto.AddInternalAccountInput;
import com.devlop3.live_football.modules.internal.InternalAccounts.dto.UpdateInternalAccountInput;
import com.devlop3.live_football.modules.internal.InternalAccounts.dto.UpdateStreamSourceInput;

import io.micrometer.common.util.StringUtils;
import jakarta.validation.Valid;

@RestController("internal.internalAccountsController")
@RequestMapping(path = "/internal/api/internal-accounts", produces = "application/json")
public class InternalAccountsController {

  private final PasswordEncoder passwordEncoder;

  @Autowired
  private MatchService matchService;

  @Autowired
  private InternalAccountService internalAccountService;

  InternalAccountsController(PasswordEncoder passwordEncoder) {
    this.passwordEncoder = passwordEncoder;
  }

  @GetMapping("")
  public ResponseEntity<?> getAllInternalAccount(
      @RequestParam(name = "role", required = false) InternalAccount.Role role) {
    try {
      List<InternalAccount> internalAccounts = internalAccountService.findAll();
      if (role != null) {
        internalAccounts = internalAccounts.stream()
            .filter(ia -> ia.getRole().equals(role))
            .toList();
      }
      return ResponseEntity.ok(Map.of("code", 200, "message", "Thành công", "data", internalAccounts));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.ok(Map.of("code", 500, "message", e.getMessage(), "error", e));
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getInternalAccountById(@PathVariable(name = "id") Long id) {
    try {
      Optional<InternalAccount> internalAccountOpt = internalAccountService.findById(id);
      if (internalAccountOpt.isEmpty())
        return ResponseEntity.ok(Map.of("code", 404, "message", "Tài khoản không tồn tại"));
      InternalAccount internalAccount = internalAccountOpt.get();
      return ResponseEntity.ok(Map.of("code", 200, "message", "Thành công", "data", internalAccount));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.ok(Map.of("code", 500, "message", e.getMessage(), "error", e));
    }
  }

  @PostMapping("/add")
  public ResponseEntity<?> postInternalAccount(@Valid @RequestBody AddInternalAccountInput internalAccountInput) {
    try {
      InternalAccount internalAccount = new InternalAccount();
      internalAccount.setUsername(internalAccountInput.getUsername());
      internalAccount.setEmail(internalAccountInput.getEmail());
      internalAccount.setPhoneNumber(internalAccountInput.getPhoneNumber());
      if (!internalAccountInput.getRawPassword().isBlank())
        internalAccount.setPassword(passwordEncoder.encode(internalAccountInput.getRawPassword()));
      internalAccount.setFullName(internalAccountInput.getFullName());
      internalAccount.setNickname(internalAccountInput.getNickname());
      internalAccount.setGender(internalAccountInput.getGender());
      internalAccount.setAvatarUrl(internalAccountInput.getAvatarUrl());
      internalAccount.setCoverUrl(internalAccountInput.getCoverUrl());
      internalAccount.setBio(internalAccountInput.getBio());
      internalAccount.setRole(internalAccountInput.getRole());
      internalAccount.setStatus(InternalAccount.Status.ACTIVE); // Default status

      internalAccountService.save(internalAccount);

      return ResponseEntity.ok(Map.of("code", 201, "message", "Thành công", "data", internalAccount));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.ok(Map.of("code", 500, "message", e.getMessage(), "error", e));
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> putInternalAccountById(@PathVariable(name = "id") Long id,
      @Valid @RequestBody UpdateInternalAccountInput updateInternalAccountInput) {
    try {
      Optional<InternalAccount> internalAccountOpt = internalAccountService.findById(id);
      if (internalAccountOpt.isEmpty())
        return ResponseEntity.ok(Map.of("code", 404, "message", "Tài khoản không tồn tại"));
      InternalAccount internalAccount = internalAccountOpt.get();

      internalAccount.setEmail(updateInternalAccountInput.getEmail());
      internalAccount.setPhoneNumber(updateInternalAccountInput.getPhoneNumber());
      if (StringUtils.isNotBlank(updateInternalAccountInput.getPassword()))
        internalAccount.setPassword(updateInternalAccountInput.getPassword());
      internalAccount.setFullName(updateInternalAccountInput.getFullName());
      internalAccount.setNickname(updateInternalAccountInput.getNickname());
      internalAccount.setGender(updateInternalAccountInput.getGender());
      internalAccount.setAvatarUrl(updateInternalAccountInput.getAvatarUrl());
      internalAccount.setCoverUrl(updateInternalAccountInput.getCoverUrl());
      internalAccount.setBio(updateInternalAccountInput.getBio());
      internalAccount.setRole(updateInternalAccountInput.getRole());
      internalAccount.setStatus(InternalAccount.Status.ACTIVE); // Default status

      internalAccountService.save(internalAccount);

      return ResponseEntity.ok(Map.of("code", 200, "message", "Thành công", "data", internalAccount));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.ok(Map.of("code", 500, "message", e.getMessage(), "error", e));
    }
  }

  @PutMapping("/{id}/update-stream-source")
  public ResponseEntity<?> putStreamSourceByInternalAccountId(@PathVariable(name = "id") Long id,
      @RequestBody UpdateStreamSourceInput updateStreamSourceInput) {
    try {
      Optional<InternalAccount> internalAccountOpt = internalAccountService.findById(id);
      if (internalAccountOpt.isEmpty())
        return ResponseEntity.ok(Map.of("code", 404, "message", "Tài khoản không tồn tại"));
      InternalAccount internalAccount = internalAccountOpt.get();

      internalAccount.setStreamSourceSd(updateStreamSourceInput.getStreamSourceSd());
      internalAccount.setStreamSourceHd(updateStreamSourceInput.getStreamSourceHd());
      internalAccount.setStreamSourceFhd(updateStreamSourceInput.getStreamSourceFhd());
      internalAccountService.save(internalAccount);

      return ResponseEntity.ok(Map.of("code", 200, "message", "Thành công", "data", internalAccount));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.ok(Map.of("code", 500, "message", e.getMessage(), "error", e));
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteInternalAccountById(@PathVariable(name = "id") Long id) {
    try {
      Optional<InternalAccount> internalAccountOpt = internalAccountService.findById(id);
      if (internalAccountOpt.isEmpty())
        return ResponseEntity.ok(Map.of("code", 404, "message", "Tài khoản không tồn tại"));
      internalAccountOpt.get().getMatchs().forEach(m -> {
        m.setCommentator(null);
        matchService.save(m);
      });
      internalAccountService.deleteById(id);
      return ResponseEntity.ok(Map.of("code", 204, "message", "Thành công"));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.ok(Map.of("code", 500, "message", e.getMessage(), "error", e));
    }
  }
}
