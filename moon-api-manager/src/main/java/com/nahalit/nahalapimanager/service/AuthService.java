package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.constant.KEY;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class AuthService {
  @Autowired
  HttpServletRequest request;
  public Long getUserNo() {
    return (Long) request.getAttribute(KEY.SESSION_USER_NO);
  }

  public Long getEmpNo() {
    return (Long) request.getAttribute(KEY.SESSION_EMP_NO);
  }

  public Long getCompanyNo() {
    return (Long) request.getAttribute(KEY.SESSION_COMPANY_NO);
  }

  public Long getSessionNo() {
    return (Long) request.getAttribute(KEY.SESSION_NO);
  }

  public String getUserType() {
    return (String) request.getAttribute(KEY.SESSION_USER_TYPE);
  }
}

