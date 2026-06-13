package com.devlop3.sports_api.schedules;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.devlop3.sports_api.config.FixturesWebSocketHandler;
// import com.devlop3.sports_api.repositories.FixtureRepository;
import com.devlop3.sports_api.services.FixtureSyncService;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FixturesSyncScheduler {
  // @Autowired
  // private FixtureRepository fixtureRepository;
  @Autowired
  private FixturesWebSocketHandler fixturesWebSocketHandler;
  @Autowired
  private FixtureSyncService fixtureSyncService;

  @Scheduled(fixedDelay = 60 * 1000)
  public void syncFixturesSchedule() {
    Instant start = Instant.now();

    try {
      List<LocalDate> dates = new ArrayList<>();
      Date syncTime = new Date();
      
      System.out.println("⏳ Bắt đầu đồng bộ lúc: " + syncTime);
      
      LocalDate today = LocalDate.now();

      for (int i = 3; i > 0; i--) {
        dates.add(today.minusDays(i));
      }
      for (int i = 0; i < 7; i++) {
        dates.add(today.plusDays(i));
      }

      dates.forEach((date) -> {
        try {
          System.out.println("🔁 Đồng bộ ngày: " + date);
          fixtureSyncService.syncFixturesByDate(date.toString());
        } catch (Exception e) {
          System.err.println("❌ Lỗi khi đồng bộ ngày: " + date);
          e.printStackTrace();
        }
      });

    } catch (Exception ex) {
      ex.printStackTrace();
    }

    try {
      fixturesWebSocketHandler.broadcastFixturesUpdate("cc");
    } catch (Exception e) {
      e.printStackTrace();
    }

    Instant end = Instant.now();
    long secondsElapsed = Duration.between(start, end).toSeconds();
    long waitSeconds = 60 - secondsElapsed;

    System.out.println("✅ Đồng bộ hoàn tất sau: " + secondsElapsed + " giây");

    if (waitSeconds > 0) {
      System.out.println("⏳ Đếm ngược đến lần đồng bộ tiếp theo:");

      for (long i = waitSeconds; i > 0; i--) {
        System.out.print("⏲️ " + i + "s\r"); // \r để ghi đè dòng trước
        try {
          Thread.sleep(1000);
        } catch (InterruptedException ignored) {
        }
      }
    }

    System.out.println("\n▶️ Chu kỳ đồng bộ tiếp theo bắt đầu...");
  }

}
