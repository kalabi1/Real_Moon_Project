package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.service.ConsoleMainService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Map;
@RequestMapping("/api/rest/console")
@RestController
public class ConsoleMainController {

  private final ConsoleMainService consoleMainService;

  public ConsoleMainController(ConsoleMainService consoleMainService) {
    this.consoleMainService = consoleMainService;
  }

  @PostMapping("/login-main")
  public ResponseEntity<Map<String, Object>> loginMain(@Valid @RequestParam String userName, @Valid @RequestParam String userPassword) {
    return new ResponseEntity<>(consoleMainService.consoleMainLogin(userName, userPassword), HttpStatus.OK);
  }

  @PostMapping("/change-user-pwd")
  public ResponseEntity<Map<String, Object>> changeUserPwd(@Valid @RequestParam String userName, @Valid @RequestParam String oldPassword, @Valid @RequestParam String newPassword) {
    return new ResponseEntity<>(consoleMainService.changeUserPwd(userName, oldPassword, newPassword), HttpStatus.OK);
  }
}
