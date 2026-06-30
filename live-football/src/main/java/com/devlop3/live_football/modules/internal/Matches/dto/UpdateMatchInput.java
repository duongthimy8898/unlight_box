package com.devlop3.live_football.modules.internal.Matches.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateMatchInput {

  private String referenceId;

  @NotBlank(message = "Title is required")
  private String title;

  @NotBlank(message = "Tournament Name is required")
  private String tournamentName;

  @NotBlank(message = "Home Club Name is required")
  private String homeClubName;

  @NotBlank(message = "Home Club Logo is required")
  private String homeClubLogoUrl;

  @NotBlank(message = "Away Club Name is required")
  private String awayClubName;

  @NotBlank(message = "Away Club Logo is required")
  private String awayClubLogoUrl;

  @NotNull(message = "Start Time is required")
  private LocalDateTime startTime;

  private Long commentatorInternalAccountId;
  private String articleUrl;
  private Boolean isHot = false;
  private Boolean isPinned = false;
  private String canonicalUrl;
  private String robotsMeta;
  private String metaDescription;
  private String sitemapUrl;
  private String keywords;
  private String schemaMarkup;
  private String openGraphMeta;
  private String featuredImageUrl;
  private String tags;
  private String author;
  private String ogTitle;
  private String ogDescription;
  private String ogImage;
  private String ogUrl;
}
