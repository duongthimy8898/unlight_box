package com.devlop3.live_football.common.models;

import java.time.LocalDate;
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
@Table(name = "external_accounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExternalAccount {

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

  @Column(name = "phone_number", length = 15)
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

  @Column(name = "date_of_birth")
  private LocalDate dateOfBirth;

  @Column(name = "avatar_url")
  private String avatarUrl;

  @Column(name = "cover_url")
  private String coverUrl;

  @Column(name = "bio", columnDefinition = "TEXT")
  private String bio;

  @Enumerated(EnumType.STRING)
  @Column(name = "status")
  private Status status = Status.ACTIVE;

  @CreationTimestamp
  @Column(name = "created_at")
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

}