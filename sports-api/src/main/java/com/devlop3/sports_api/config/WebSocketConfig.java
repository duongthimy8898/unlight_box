package com.devlop3.sports_api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer  {

  private final FixturesWebSocketHandler fixturesWebSocketHandler;

  public WebSocketConfig(FixturesWebSocketHandler fixturesWebSocketHandler) {
    this.fixturesWebSocketHandler = fixturesWebSocketHandler;
  }

  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(fixturesWebSocketHandler, "/ws/chat").setAllowedOriginPatterns("*");
  }
}