package com.devlop3.live_football.common.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devlop3.live_football.common.models.InternalAccount;

@Repository
public interface InternalAccountRepository extends JpaRepository<InternalAccount, Long> {
  public Optional<InternalAccount> findByUsername(String username);
  public Optional<InternalAccount> findByEmail(String email);
  public Optional<InternalAccount> findByPhoneNumber(String phoneNumber);
}