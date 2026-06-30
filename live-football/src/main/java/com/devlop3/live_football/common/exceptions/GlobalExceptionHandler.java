package com.devlop3.live_football.common.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ResponseEntity<Map<String, Object>> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
    Map<String, Object> response = new HashMap<>();

    // Thêm thông tin lỗi vào response
    response.put("code", 400);
    response.put("message", "Request body is missing or malformed");
    
    // Trả về lỗi dưới dạng ResponseEntity
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
    Map<String, Object> response = new HashMap<>();

    // Thêm thông tin lỗi vào response
    response.put("code", 400);
    response.put("message", "Thiếu trường bắt buộc");

    // Lấy tất cả các lỗi từ bindingResult
    Map<String, String> invalidFields = new HashMap<>();
    ex.getBindingResult().getFieldErrors().forEach((error) -> {
      invalidFields.put(error.getField(), error.getDefaultMessage());
    });

    response.put("invalid_fields", invalidFields);

    // Trả về lỗi dưới dạng ResponseEntity
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
}