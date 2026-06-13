package com.devlop3.sports_api.models;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Optional;

import com.devlop3.sports_api.utils.SlugUtil;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Fixture {

  @Id
  private Long id;

  @JsonIgnore
  private String referee;

  @JsonIgnore
  private String timezone;

  @JsonIgnore
  private ZonedDateTime date;

  @JsonIgnore
  private Long timestamp;

  @Embedded
  private FixturePeriod periods;

  // @JsonIgnore
  @Embedded
  private FixtureStatus status;

  @JsonIgnoreProperties("fixture")
  @ManyToOne
  @JoinColumn(name = "venue_id")
  private Venue venue;

  @JsonIgnoreProperties("fixture")
  @ManyToOne
  @JoinColumn(name = "league_id")
  private League league;

  @JsonIgnoreProperties({ "fixture", "id" })
  @ManyToOne
  @JoinColumn(name = "home_team_id")
  private Team homeTeam;

  @JsonIgnoreProperties({ "fixture", "id" })
  @ManyToOne
  @JoinColumn(name = "away_team_id")
  private Team awayTeam;

  @JsonProperty("home_score")
  private Integer goalsHome;

  @JsonProperty("away_score")
  private Integer goalsAway;

  @JsonIgnore
  @JsonIgnoreProperties({ "fixture", "id" })
  @OneToOne(mappedBy = "fixture", cascade = CascadeType.ALL, orphanRemoval = true)
  private Score score;

  @JsonProperty("slug")
  public String getSlug() {
    return SlugUtil.toSlug(this.getTitle()) + "-I" + this.id;
  }

  @JsonProperty("title")
  public String getTitle() {
    return this.homeTeam.getName() + " vs " + this.awayTeam.getName();
  }

  @JsonProperty("elapsed")
  public Integer getElapsed() {
    if (this.status == null)
      return null;

    return Optional.ofNullable(status.getElapsed()).orElse(0)
        + Optional.ofNullable(status.getExtra()).orElse(0);
  }

  @JsonProperty("status_vi")
  public String getStatusVietnamese() {
    return switch (this.status.getShortStatus()) {
      case "TBD", "NS" -> "Chưa bắt đầu";
      case "1H" -> "Hiệp 1";
      case "HT" -> "Giữa hiệp";
      case "2H" -> "Hiệp 2";
      case "ET" -> "Hiệp phụ";
      case "BT" -> "Giữa hiệp phụ";
      case "P" -> "Đang đá Penalty";
      case "SUSP" -> "Bị đình chỉ";
      case "INT" -> "Tạm dừng";
      case "FT" -> "Kết thúc";
      case "AET" -> "Kết thúc";
      case "PEN" -> "Kết thúc";
      case "PST" -> "Hoãn";
      case "CANC" -> "Hủy";
      case "ABD" -> "Bỏ dở";
      case "AWD" -> "Xử thua kỹ thuật";
      case "WO" -> "Thắng không cần đấu";
      case "LIVE" -> "Đang diễn ra";
      default -> "Không rõ";
    };
  }

  @JsonProperty("is_playing")
  public boolean isPlaying() {
    if (status == null || status.getShortStatus() == null)
      return false;

    return switch (status.getShortStatus().toUpperCase()) {
      case "1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE" -> true;
      default -> false;
    };
  }

  @JsonProperty("start_date_formatted")
  public LocalDateTime getStartDateFormatted() {
    return this.date.withZoneSameInstant(ZoneId.of("Asia/Ho_Chi_Minh")).toLocalDateTime();
  }
}
