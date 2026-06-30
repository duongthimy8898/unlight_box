package com.devlop3.live_football.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .csrf(csrf -> csrf.disable()) // Vô hiệu CSRF vì đây là API, không phải form
        .authorizeHttpRequests(t -> t.anyRequest().permitAll());
    ;
    return http.build();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    
    // config.addAllowedOrigin("https://dash.bugiotv.xyz");
    // config.addAllowedOriginPattern("https://*.bugio1.live");
    // config.addAllowedOriginPattern("https://*.bugio2.live");
    // config.addAllowedOriginPattern("https://*.bugio3.live");
    // config.addAllowedOriginPattern("https://*.bugio4.live");
    // config.addAllowedOriginPattern("https://*.bugio5.live");
    // config.addAllowedOriginPattern("https://*.bugio6.live");
    // config.addAllowedOriginPattern("https://*.bugio7.live");
    // config.addAllowedOriginPattern("https://*.bugio8.live");
    // config.addAllowedOriginPattern("https://*.bugio9.live");
    // config.addAllowedOriginPattern("https://*.bugio10.live");

    // config.addAllowedOrigin("https://dash.tamquoctv.xyz");
    // config.addAllowedOriginPattern("https://*.tamquoc.live");
    // config.addAllowedOriginPattern("https://*.tamquoc1.live");
    // config.addAllowedOriginPattern("https://*.tamquoc2.live");
    // config.addAllowedOriginPattern("https://*.tamquoc3.live");
    // config.addAllowedOriginPattern("https://*.tamquoc4.live");
    // config.addAllowedOriginPattern("https://*.tamquoc5.live");
    // config.addAllowedOriginPattern("https://*.tamquoc6.live");
    // config.addAllowedOriginPattern("https://*.tamquoc7.live");
    // config.addAllowedOriginPattern("https://*.tamquoc8.live");
    // config.addAllowedOriginPattern("https://*.tamquoc9.live");
    // config.addAllowedOriginPattern("https://*.tamquoc10.live");

    // config.addAllowedOrigin("https://dash.vongcamtv.xyz");
    // config.addAllowedOriginPattern("https://vongcam.live");
    // config.addAllowedOriginPattern("https://*.vongcam.live");
    // config.addAllowedOriginPattern("https://*.vongcam1.live");
    // config.addAllowedOriginPattern("https://*.vongcam2.live");
    // config.addAllowedOriginPattern("https://*.vongcam3.live");
    // config.addAllowedOriginPattern("https://*.vongcam4.live");
    // config.addAllowedOriginPattern("https://*.vongcam5.live");
    // config.addAllowedOriginPattern("https://*.vongcam6.live");
    // config.addAllowedOriginPattern("https://*.vongcam7.live");
    // config.addAllowedOriginPattern("https://*.vongcam8.live");
    // config.addAllowedOriginPattern("https://*.vongcam9.live");

    // config.addAllowedOrigin("http://localhost:8000");
    // config.addAllowedOrigin("http://localhost:8080");
    // config.addAllowedOrigin("http://localhost:5173");
    // config.addAllowedOrigin("http://localhost:5174");
    // config.addAllowedOrigin("http://localhost:4173");
    config.addAllowedOriginPattern("*");
    config.addAllowedMethod("*");
    config.addAllowedHeader("*");
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
  }
}
