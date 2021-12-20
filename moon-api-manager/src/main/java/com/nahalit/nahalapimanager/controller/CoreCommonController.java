package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.AppResponse;
import com.nahalit.nahalapimanager.dao.CoreCommonRepo;
import com.nahalit.nahalapimanager.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController(value = "coreCommonController")
@RequestMapping(value = { "api/rest/core/common"}, consumes = {MediaType.APPLICATION_JSON_VALUE,MediaType.APPLICATION_FORM_URLENCODED_VALUE})
public class CoreCommonController {
  private @Autowired
  HttpServletRequest request;
  private @Autowired
  CoreCommonRepo commonRepo;
  private @Autowired
  AuthService authService;

  @PostMapping("/console-menu")
  public AppResponse getMenu(@RequestParam(value = "menuType") String menuType  ) {
    return AppResponse.build(HttpStatus.OK).body(commonRepo.getMenu(authService.getCompanyNo(), authService.getUserNo(),menuType));
  }
}
