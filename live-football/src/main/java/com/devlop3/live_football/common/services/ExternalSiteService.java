package com.devlop3.live_football.common.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devlop3.live_football.common.models.ExternalSite;
import com.devlop3.live_football.common.repositories.ExternalSiteRepository;

@Service
public class ExternalSiteService {

    @Autowired
    private ExternalSiteRepository externalSiteRepository;

    public List<ExternalSite> findAll() {
        return externalSiteRepository.findAll();
    }

    public Optional<ExternalSite> findById(Long id) {
        return externalSiteRepository.findById(id);
    }

    public ExternalSite save(ExternalSite externalSite) {
        return externalSiteRepository.save(externalSite);
    }

    public void deleteById(Long id) {
        externalSiteRepository.deleteById(id);
    }
}