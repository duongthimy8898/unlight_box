package com.devlop3.live_football.modules.internal.Matches.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.devlop3.live_football.common.models.InternalAccount;
import com.devlop3.live_football.common.models.Match;
import com.devlop3.live_football.common.models.Stream;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchOutput {
  private Long id;
  private Match.Type type;
  private String referenceId;
  private String slug;
  private String title;
  private String tournamentName;

  private ClubDTO homeClub;
  private ClubDTO awayClub;

  private LocalDateTime startTime;
  private InternalAccount commentator; // hoặc bạn muốn embed thông tin commentator thì tạo DTO riêng

  private String articleUrl;
  private Boolean isHot;
  private Boolean isPinned;
  private Boolean isLive;
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

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  private List<Stream> streams;

  public MatchOutput(Match match) {
    this.id = match.getId();
    this.type = match.getType();
    this.referenceId = match.getReferenceId();
    this.slug = match.getSlug();
    this.title = match.getTitle();
    this.tournamentName = match.getTournamentName();

    this.homeClub = new ClubDTO(match.getHomeClubName(), match.getHomeClubLogoUrl());
    this.awayClub = new ClubDTO(match.getAwayClubName(), match.getAwayClubLogoUrl());

    this.startTime = match.getStartTime();
    this.commentator = match.getCommentator();

    this.articleUrl = match.getArticleUrl();
    this.isHot = match.getIsHot();
    this.isPinned = match.getIsPinned();
    this.isLive = match.getIsLive();
    this.canonicalUrl = match.getCanonicalUrl();
    this.robotsMeta = match.getRobotsMeta();
    this.metaDescription = match.getMetaDescription();
    this.sitemapUrl = match.getSitemapUrl();
    this.keywords = match.getKeywords();
    this.schemaMarkup = match.getSchemaMarkup();
    this.openGraphMeta = match.getOpenGraphMeta();
    this.featuredImageUrl = match.getFeaturedImageUrl();
    this.tags = match.getTags();
    this.author = match.getAuthor();
    this.ogTitle = match.getOgTitle();
    this.ogDescription = match.getOgDescription();
    this.ogImage = match.getOgImage();
    this.ogUrl = match.getOgUrl();

    this.createdAt = match.getCreatedAt();
    this.updatedAt = match.getUpdatedAt();
  }

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class ClubDTO {
    private String name;
    private String logoUrl;
  }
}
