package com.devlop3.live_football.common.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devlop3.live_football.common.models.InternalAccount;
import com.devlop3.live_football.common.repositories.InternalAccountRepository;

@Service
public class InternalAccountService {

    @Autowired
    private InternalAccountRepository internalAccountRepository;

    public List<InternalAccount> findAll() {
        return internalAccountRepository.findAll();
    }

    public Optional<InternalAccount> findById(Long id) {
        return internalAccountRepository.findById(id);
    }

    public Optional<InternalAccount> findByUsername(String username) {
      return internalAccountRepository.findByUsername(username);
    }

    public InternalAccount save(InternalAccount internalAccount) {
        return internalAccountRepository.save(internalAccount);
    }

    public void deleteById(Long id) {
        internalAccountRepository.deleteById(id);
    }
}