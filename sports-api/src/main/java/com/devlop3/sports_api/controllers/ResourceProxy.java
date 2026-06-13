package com.devlop3.sports_api.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController("/rs-api")
public class ResourceProxy {
  @GetMapping("/media")
  public ResponseEntity<byte[]> proxyImage(@RequestParam String url) {
    try {
      URL imageUrl = URI.create(url).toURL();
      HttpURLConnection connection = (HttpURLConnection) imageUrl.openConnection();
      connection.setRequestMethod("GET");

      String contentType = connection.getContentType();
      InputStream inputStream = connection.getInputStream();
      byte[] imageBytes = inputStream.readAllBytes();

      return ResponseEntity
          .ok()
          .contentType(MediaType.parseMediaType(contentType))
          .body(imageBytes);

    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_GATEWAY).build();
    }
  }
}
