package com.devlop3.sports_api.exceptions;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(MethodArgumentTypeMismatchException.class)
  public ResponseEntity<?> handleMismatch(MethodArgumentTypeMismatchException ex) {
    return ResponseEntity
        .ok(Map.of("code", 400, "message", "Tham số '" + ex.getName() + "' phải là kiểu " + ex.getRequiredType()));
  }
}
