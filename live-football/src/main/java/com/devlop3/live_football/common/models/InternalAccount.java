package com.devlop3.live_football.common.models;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "internal_accounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InternalAccount {

  public enum Role {
    SYSTEM_ADMIN,
    SCHEDULER,
    COMMENTATOR,
    CLIENT_MANAGER,
    SITE_MANAGER,
    AD_MANAGER;
  }

  public enum Gender {
    MALE, FEMALE, OTHER
  }

  public enum Status {
    ACTIVE, LOCKED, BANNED, DELETED
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "username", nullable = false, unique = true, length = 50)
  private String username;

  @Column(name = "email", unique = true, length = 100)
  private String email;

  @Column(name = "phone_number", length = 16)
  private String phoneNumber;

  @Column(name = "password", nullable = false)
  private String password;

  @Column(name = "full_name")
  private String fullName;

  @Column(name = "nickname")
  private String nickname;

  @Enumerated(EnumType.STRING)
  @Column(name = "gender")
  private Gender gender;

  @Column(name = "avatar_url")
  private String avatarUrl;

  @Column(name = "cover_url")
  private String coverUrl;

  @Column(name = "bio", columnDefinition = "TEXT")
  private String bio;

  @Column(name = "stream_source_sd")
  private String streamSourceSd;

  @Column(name = "stream_source_hd")
  private String streamSourceHd;

  @Column(name = "stream_source_fhd")
  private String streamSourceFhd;

  @Enumerated(EnumType.STRING)
  @Column(name = "status")
  private Status status = Status.ACTIVE;

  @Enumerated(EnumType.STRING)
  @Column(name = "role")
  private Role role;

  @CreationTimestamp
  @Column(name = "created_at")
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  @JsonIgnoreProperties("commentator")
  @OneToMany(mappedBy = "commentator", fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
  private List<Match> matchs;

  @PrePersist
  @PreUpdate
  private void prepareData() {
    if (email != null && email.isEmpty())
      email = null;
  }

}
