package com.devlop3.sports_api.config;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

@Component
public class FixturesWebSocketHandler extends TextWebSocketHandler {

  private final Set<WebSocketSession> sessions = new CopyOnWriteArraySet<>();

  private final Map<String, Set<WebSocketSession>> channels = new ConcurrentHashMap<>();
  private final ObjectMapper mapper = new ObjectMapper();

  @Override
  public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    sessions.add(session);
    System.out.println("New client connected: " + session.getId());
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    sessions.remove(session);
    System.out.println("Client disconnected: " + session.getId());
  }

  @Override
  protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    JsonNode node = mapper.readTree(message.getPayload());

    // 🔑 Kiểm tra nếu là ping
    if (node.has("type") && "ping".equals(node.get("type").asText())) {
      session.sendMessage(new TextMessage("{\"type\":\"pong\"}"));
      System.out.println("Received ping -> sent pong");
      return;
    }

    String action = node.get("action").asText();
    String channel = node.get("channel").asText();
    String id = node.has("id") ? node.get("id").asText() : null;

    String key = channel + ":" + id;

    if ("subscribe".equals(action)) {
      channels.computeIfAbsent(key, k -> ConcurrentHashMap.newKeySet()).add(session);
      System.out.println("Session " + session.getId() + " subscribed to " + key);
    }

    if ("unsubscribe".equals(action)) {
      if (channels.containsKey(key)) {
        channels.get(key).remove(session);
        System.out.println("Session " + session.getId() + " unsubscribed from " + key);
      }
    }
  }

  public void broadcastFixturesUpdate(String jsonData) throws Exception {
    Set<WebSocketSession> sessions = channels.get("fixtures");
    if (sessions != null) {
      for (WebSocketSession session : sessions) {
        if (session.isOpen()) {
          session.sendMessage(new TextMessage(jsonData));
        }
      }
    }
  }
}
