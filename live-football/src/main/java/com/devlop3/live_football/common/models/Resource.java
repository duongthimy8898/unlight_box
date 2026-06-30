package com.devlop3.live_football.common.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "resources")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Resource {
  public enum ResourceType {
    IMAGE,
    VIDEO,
    DOCUMENT,
    AUDIO
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id; 
  @Column(name = "short_url", nullable = false, unique = true)
  private String shortUrl; 

  @Column(name = "store_path", nullable = false)
  private String storePath; 

  @Enumerated(EnumType.STRING)
  @Column(name = "resource_type", nullable = false)
  private ResourceType resourceType;

  @Column(name = "description", length = 500)
  private String description; 

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt; 

  @UpdateTimestamp
  @Column(name = "updated_at")
  private LocalDateTime updatedAt; 
}