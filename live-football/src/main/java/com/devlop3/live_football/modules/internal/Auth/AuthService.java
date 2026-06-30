package com.devlop3.live_football.modules.internal.Auth;

import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devlop3.live_football.common.models.InternalAccount;
import com.devlop3.live_football.common.repositories.InternalAccountRepository;

@Service
public class AuthService {
  @Autowired
  private InternalAccountRepository internalAccountRepository;

  public Optional<InternalAccount> findByIdentifier(String identifier) {
    // Optional<InternalAccount> internalAccountOpt;
    // internalAccountOpt = internalAccountRepository.findByUsername(identifier);
    // if (internalAccountOpt.isEmpty())
    // internalAccountOpt = internalAccountRepository.findByEmail(identifier);
    // if (internalAccountOpt.isEmpty())
    // internalAccountOpt = internalAccountRepository.findByPhoneNumber(identifier);
    // return internalAccountOpt;
    return Stream.<Function<String, Optional<InternalAccount>>>of(
        internalAccountRepository::findByUsername,
        internalAccountRepository::findByEmail,
        internalAccountRepository::findByPhoneNumber)
        .map(func -> func.apply(identifier))
        .filter(Optional::isPresent)
        .map(Optional::get)
        .findFirst();
  }
}
