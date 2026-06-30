package com.devlop3.live_football.common.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "external_sites")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExternalSite {

  public enum Status {
    ACTIVE, DISABLED, DELETED
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name", unique = true)
  private String name;

  @Column(name = "domain", unique = true) 
  private String domain;

  @Column(name = "ip")
  private String ipAddress;

  @Column(name = "api_key")
  private String apiKey;

  @Enumerated(EnumType.STRING)
  @Column(name = "status")
  private Status status;

  @OneToOne(mappedBy = "externalSite", cascade = CascadeType.ALL)
  private ExternalAdSettings externalWebSettings;

  @CreationTimestamp
  @Column(name = "created_at")
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;
}
