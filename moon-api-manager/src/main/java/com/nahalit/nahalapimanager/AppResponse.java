package com.nahalit.nahalapimanager;

import org.springframework.http.HttpStatus;

public class AppResponse<T> {

  private HttpStatus status;
  private String message;
  private String error;
  private String path;
  private T body;
  private T header;

  private AppResponse(HttpStatus status) {
    this.status = status;
  }

  private AppResponse() {
  }

  public static AppResponse build(HttpStatus status) {
    return new AppResponse(status);
  }

  public Integer getStatus() {
    return status.value();
  }

  public String getMessage() {
    return message;
  }

  public AppResponse message(String message) {
    this.message = message;
    return this;
  }

  public T getBody() {
    return body;
  }

  public AppResponse body(T data) {
    this.body = data;
    return this;
  }
  public AppResponse header(T data) {
    this.header = data;
    return this;
  }

  public T getHeader() {
    return header;
  }
}