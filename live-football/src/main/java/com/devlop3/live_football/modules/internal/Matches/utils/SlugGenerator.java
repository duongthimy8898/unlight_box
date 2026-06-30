package com.devlop3.live_football.modules.internal.Matches.utils;

import java.text.Normalizer;

public class SlugGenerator {
  public static String generate(String input) {
    // Loại bỏ dấu
    String noAccents = Normalizer.normalize(input, Normalizer.Form.NFD);
    noAccents = noAccents.replaceAll("[^\\p{ASCII}]", "");

    // Chuyển đổi thành chữ thường và thay thế khoảng trắng bằng dấu gạch ngang
    String slug = noAccents.toLowerCase().trim().replaceAll("[\\s\\W-]+", "-");

    // Loại bỏ dấu gạch ngang ở đầu và cuối chuỗi
    return slug.replaceAll("^-|-$", "");
  }
}