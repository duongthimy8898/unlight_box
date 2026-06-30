package com.devlop3.live_football.common.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devlop3.live_football.common.models.ExternalAccount;
import com.devlop3.live_football.common.repositories.ExternalAccountRepository;

@Service
public class ExternalAccountService {

    @Autowired
    private ExternalAccountRepository externalAccountRepository;

    public List<ExternalAccount> findAll() {
        return externalAccountRepository.findAll();
    }

    public Optional<ExternalAccount> findById(Long id) {
        return externalAccountRepository.findById(id);
    }

    public ExternalAccount save(ExternalAccount externalAccount) {
        return externalAccountRepository.save(externalAccount);
    }

    public void deleteById(Long id) {
        externalAccountRepository.deleteById(id);
    }
}