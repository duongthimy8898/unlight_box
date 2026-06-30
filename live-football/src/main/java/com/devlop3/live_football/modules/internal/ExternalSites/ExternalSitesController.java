package com.devlop3.live_football.modules.internal.ExternalSites;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController("internal.externalSitesController")
@RequestMapping(path = "/internal/api/external-sites", produces = "application/json")
public class ExternalSitesController {
  @GetMapping("")
  public ResponseEntity<?> getAllExternalSite() {
    return ResponseEntity.ok(Map.of());
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getExternalSiteById(@PathVariable(name = "id") Long id) {
    return ResponseEntity.ok(Map.of());
  }

  @PostMapping("/add")
  public ResponseEntity<?> postExternalSite(@RequestBody String entity) {
    return ResponseEntity.ok(Map.of());
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> putExternalSiteById(@PathVariable(name = "id") Long id) {
    return ResponseEntity.ok(Map.of());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteExternalSiteById(@PathVariable(name = "id") Long id) {
    return ResponseEntity.ok(Map.of());
  }
}
