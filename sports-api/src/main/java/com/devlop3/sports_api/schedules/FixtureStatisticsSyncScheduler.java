// package com.devlop3.sports_api.schedules;

// import com.devlop3.sports_api.services.FixtureStatisticsSyncService;
// import lombok.RequiredArgsConstructor;
// import org.springframework.scheduling.annotation.Scheduled;
// import org.springframework.stereotype.Component;

// import java.time.Duration;
// import java.time.Instant;

// @Component
// @RequiredArgsConstructor
// public class FixtureStatisticsSyncScheduler {

//     private final FixtureStatisticsSyncService fixtureStatisticsSyncService;

//     // @Scheduled(fixedDelay = 60 * 1000)
//     public void syncFixtureStatisticsSchedule() {
//         Instant start = Instant.now();
//         System.out.println("📊 Bắt đầu đồng bộ thống kê fixture...");

//         try {
//             fixtureStatisticsSyncService.syncAllAvailableFixtureStatistics();
//         } catch (Exception e) {
//             System.err.println("❌ Lỗi khi đồng bộ thống kê: " + e.getMessage());
//             e.printStackTrace();
//         }

//         Instant end = Instant.now();
//         long durationSeconds = Duration.between(start, end).toSeconds();
//         long waitSeconds = 60 - durationSeconds;

//         System.out.println("✅ Hoàn tất đồng bộ thống kê sau: " + durationSeconds + " giây");

//         if (waitSeconds > 0) {
//             System.out.println("⏳ Đếm ngược đến lần đồng bộ tiếp theo:");
//             for (long i = waitSeconds; i > 0; i--) {
//                 System.out.print("⏲️ " + i + "s\r");
//                 try {
//                     Thread.sleep(1000);
//                 } catch (InterruptedException ignored) {
//                 }
//             }
//         }

//         System.out.println("\n▶️ Chu kỳ thống kê tiếp theo bắt đầu...");
//     }
// }
