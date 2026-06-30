package com.devlop3.live_football.common.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devlop3.live_football.common.models.ExternalAdSettings;
import com.devlop3.live_football.common.repositories.ExternalAdSettingsRepository;

@Service
public class ExternalAdSettingsService {

    @Autowired
    private ExternalAdSettingsRepository externalAdSettingsRepository;

    public List<ExternalAdSettings> findAll() {
        return externalAdSettingsRepository.findAll();
    }

    public Optional<ExternalAdSettings> findById(Long id) {
        return externalAdSettingsRepository.findById(id);
    }

    public ExternalAdSettings save(ExternalAdSettings externalAdSettings) {
        return externalAdSettingsRepository.save(externalAdSettings);
    }

    public void deleteById(Long id) {
        externalAdSettingsRepository.deleteById(id);
    }
}