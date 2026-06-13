package com.devlop3.sports_api.utils;

import java.text.Normalizer;
import java.util.Locale;

public class SlugUtil {

  public static String toSlug(String input) {
    if (input == null)
      return "";

    String slug = Normalizer.normalize(input, Normalizer.Form.NFD)
        .replaceAll("\\p{M}", "") // bỏ dấu tiếng Việt
        .replaceAll("[^\\w\\s-]", "") // bỏ ký tự đặc biệt
        .replaceAll("[\\s_]+", "-") // khoảng trắng, _ → -
        .replaceAll("-{2,}", "-") // gộp dấu - liên tiếp
        .replaceAll("^-|-$", "") // xóa - đầu/cuối
        .toLowerCase(Locale.ENGLISH); // chuyển lowercase

    return slug;
  }
}