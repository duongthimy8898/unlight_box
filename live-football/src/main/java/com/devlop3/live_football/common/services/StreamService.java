package com.devlop3.live_football.common.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devlop3.live_football.common.models.Stream;
import com.devlop3.live_football.common.repositories.StreamRepository;

@Service
public class StreamService {

  @Autowired
  private StreamRepository streamRepository;

  public List<Stream> findAll() {
    return streamRepository.findAll();
  }

  public Optional<Stream> findById(Long id) {
    return streamRepository.findById(id);
  }

  public Stream save(Stream stream) {
    return streamRepository.save(stream);
  }

  public void deleteById(Long id) {
    streamRepository.deleteById(id);
  }

  public void delete(Stream stream) {
    streamRepository.delete(stream);
  }
}