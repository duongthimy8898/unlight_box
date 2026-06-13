package com.devlop3.sports_api.specifications;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import org.springframework.data.jpa.domain.Specification;

import com.devlop3.sports_api.models.Fixture;

public class FixtureSpecifications {

  public static Specification<Fixture> hasDate(LocalDate date) {
    return (root, query, builder) -> {
      ZonedDateTime start = date.atStartOfDay().atZone(ZoneId.of("Asia/Ho_Chi_Minh"))
          .withZoneSameInstant(ZoneId.of("UTC"));
      ZonedDateTime end = date.atTime(23, 59, 59).atZone(ZoneId.of("Asia/Ho_Chi_Minh"))
          .withZoneSameInstant(ZoneId.of("UTC"));
      return builder.between(root.get("date"), start, end);
    };
  }

  public static Specification<Fixture> hasDateBetween(LocalDate from, LocalDate to) {
    ZonedDateTime start = from.atStartOfDay().atZone(ZoneId.of("Asia/Ho_Chi_Minh"))
        .withZoneSameInstant(ZoneId.of("UTC"));
    ZonedDateTime end = to.atTime(23, 59, 59)
        .atZone(ZoneId.of("Asia/Ho_Chi_Minh"))
        .withZoneSameInstant(ZoneId.of("UTC"));
    return (root, query, builder) -> builder.between(root.get("date"), start, end);
  }

  public static Specification<Fixture> hasDateTime(LocalDateTime dateTime) {
    return (root, query, builder) -> {
      ZonedDateTime eqDateTime = dateTime.atZone(ZoneId.of("Asia/Ho_Chi_Minh")).withZoneSameInstant(ZoneId.of("UTC"));
      return builder.equal(root.get("date"), eqDateTime);
    };
  }

  public static Specification<Fixture> hasDateTimeBetween(LocalDateTime from, LocalDateTime to) {
    ZonedDateTime start = from.atZone(ZoneId.of("Asia/Ho_Chi_Minh")).withZoneSameInstant(ZoneId.of("UTC"));
    ZonedDateTime end = to.atZone(ZoneId.of("Asia/Ho_Chi_Minh"))
        .withZoneSameInstant(ZoneId.of("UTC"));
    return (root, query, builder) -> builder.between(root.get("date"), start, end);
  }

  public static Specification<Fixture> isPlaying(Boolean playing) {
    return (root, query, builder) -> {
      if (playing == null)
        return null;
      if (playing) {
        return builder.upper(root.get("status").get("shortStatus")).in(
            "1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE");
      } else {
        return builder.not(
            builder.upper(root.get("status").get("shortStatus")).in(
                "1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"));
      }
    };
  }

  public static Specification<Fixture> hasStatus(String shortStatus) {
    return (root, query, builder) -> shortStatus == null ? null
        : builder.equal(root.get("status").get("shortStatus"), shortStatus);
  }

  public static Specification<Fixture> hasLeague(Long leagueId) {
    return (root, query, builder) -> leagueId == null ? null : builder.equal(root.get("league").get("id"), leagueId);
  }

  public static Specification<Fixture> hasTeam(Long teamId) {
    return (root, query, builder) -> {
      if (teamId == null)
        return null;
      return builder.or(
          builder.equal(root.get("homeTeam").get("id"), teamId),
          builder.equal(root.get("awayTeam").get("id"), teamId));
    };
  }
}
