package com.devlop3.sports_api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfig {

  private static final String API_KEY = "5e58558e7a6c6ed543f81b4efcfbea86";
  private static final String API_HOST = "v3.football.api-sports.io";

  @Bean
  public RestTemplate restTemplate() {
    RestTemplate restTemplate = new RestTemplate();

    // Add an interceptor to inject headers into every request
    ClientHttpRequestInterceptor headerInterceptor = (request, body, execution) -> {
      HttpHeaders headers = request.getHeaders();
      headers.add("x-rapidapi-key", API_KEY);
      headers.add("x-rapidapi-host", API_HOST);
      return execution.execute(request, body);
    };

    restTemplate.getInterceptors().add(headerInterceptor);
    return restTemplate;
  }
}