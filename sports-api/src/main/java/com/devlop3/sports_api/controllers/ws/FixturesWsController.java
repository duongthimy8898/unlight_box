package com.devlop3.sports_api.controllers.ws;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class FixturesWsController {
  @MessageMapping("/hello")
  @SendTo("/topic/greetings")
  public String greeting(String message) {
    return "Xin chào " + message + "!";
  }
}
