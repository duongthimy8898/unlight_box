package com.devlop3.sports_api.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

  private final AccessTokenAuthFilter accessTokenAuthFilter;

  public SecurityConfig(AccessTokenAuthFilter accessTokenAuthFilter) {
    this.accessTokenAuthFilter = accessTokenAuthFilter;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.cors(Customizer.withDefaults())
        .csrf(csrf -> csrf.disable())
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .anyRequest().authenticated())
        .addFilterBefore(accessTokenAuthFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();

    config.setAllowedOriginPatterns(List.of(
        "http://localhost:3000",
        "http://localhost:4173",
        "http://localhost:4174",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:8000",

        "https://*.tamquoctv.xyz",
        "https://*.bugiotv.xyz",

        "https://*.bugio.live",
        "https://*.bugio1.live",
        "https://*.bugio2.live",
        "https://*.bugio3.live",
        "https://*.bugio4.live",
        "https://*.bugio5.live",
        "https://*.bugio6.live",
        "https://*.bugio7.live",
        "https://*.bugio8.live",
        "https://*.bugio9.live",
        "https://*.bugio10.live",

        "https://*.tamquoc.live",
        "https://*.tamquoc1.live",
        "https://*.tamquoc2.live",
        "https://*.tamquoc3.live",
        "https://*.tamquoc4.live",
        "https://*.tamquoc5.live",
        "https://*.tamquoc6.live",
        "https://*.tamquoc7.live",
        "https://*.tamquoc8.live",
        "https://*.tamquoc9.live",
        "https://*.tamquoc10.live",

        "https://vongcam.live",
        "https://*.vongcam.live",
        "https://*.vongcam1.live",
        "https://*.vongcam2.live",
        "https://*.vongcam3.live",
        "https://*.vongcam4.live",
        "https://*.vongcam5.live",
        "https://*.vongcam6.live",
        "https://*.vongcam7.live",
        "https://*.vongcam8.live",
        "https://*.vongcam9.live",
        "https://*.vongcam10.live",

        "https://hoiquan.live",
        "https://*.hoiquan.live",
        "https://*.hoiquan1.live",
        "https://*.hoiquan2.live",
        "https://*.hoiquan3.live",
        "https://*.hoiquan4.live",
        "https://*.hoiquan5.live",
        "https://*.hoiquan6.live",
        "https://*.hoiquan7.live",
        "https://*.hoiquan8.live",
        "https://*.hoiquan9.live",
        "https://*.hoiquan10.live")); // 👈 Origin FE của bạn
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("*"));
    config.setExposedHeaders(List.of("Access-Token")); // 👈 nếu FE cần đọc header này
    config.setAllowCredentials(true); // 👈 nếu bạn dùng Cookie/JWT Header

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
  }
}
