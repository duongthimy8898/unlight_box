package com.devlop3.live_football.common.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PreRemove;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "matches")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Match {

  public enum Type {
    FETCHED,
    MANUAL
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Enumerated(EnumType.STRING)
  @Column(name = "type")
  private Type type;

  @Column(name = "reference_id")
  private String referenceId;

  @Column(name = "slug")
  private String slug;

  @Column(name = "title")
  private String title;

  @Column(name = "tournament_name")
  private String tournamentName;

  @Column(name = "home_club_name")
  private String homeClubName;

  @Lob
  @Column(name = "home_club_logo_url")
  private String homeClubLogoUrl;

  @Column(name = "away_club_name")
  private String awayClubName;

  @Lob
  @Column(name = "away_club_logo_url")
  private String awayClubLogoUrl;

  @Column(name = "start_time")
  private LocalDateTime startTime;

  @JsonIgnoreProperties("matches")
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "commentator_internal_account_id")
  private InternalAccount commentator;

  @Column(name = "article_url")
  private String articleUrl;

  @Column(name = "is_hot")
  private Boolean isHot = false;

  @Column(name = "is_pinned")
  private Boolean isPinned = false;

  @Column(name = "is_live")
  private Boolean isLive = false;

  @Column(name = "canonical_url")
  private String canonicalUrl;

  @Column(name = "robots_meta")
  private String robotsMeta;

  @Column(name = "meta_description")
  private String metaDescription;

  @Column(name = "sitemap_url")
  private String sitemapUrl;

  @Column(name = "keywords")
  private String keywords;

  @Column(name = "schema_markup")
  private String schemaMarkup;

  @Column(name = "open_graph_meta")
  private String openGraphMeta;

  @Column(name = "feature_image_url")
  private String featuredImageUrl;

  @Column(name = "tags")
  private String tags;

  @Column(name = "author")
  private String author;

  @Column(name = "og_title")
  private String ogTitle;

  @Column(name = "og_description")
  private String ogDescription;

  @Column(name = "og_image")
  private String ogImage;

  @Column(name = "og_url")
  private String ogUrl;

  @CreationTimestamp
  @Column(name = "created_at")
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  @PreRemove
  public void removeCommentator() {
    if (commentator != null) {
      this.commentator = null;
    }
  }
}
