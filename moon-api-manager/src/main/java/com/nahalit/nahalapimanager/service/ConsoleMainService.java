package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.dao.ConsoleMainDao;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ConsoleMainService {
  private final ConsoleMainDao consoleMainDao;

  public ConsoleMainService(ConsoleMainDao consoleMainDao) {
    this.consoleMainDao = consoleMainDao;
  }

  public Map<String, Object> consoleMainLogin(String userName, String userPassword) {
    return consoleMainDao.consoleMainLogin(userName, userPassword);
  }

  public Map<String, Object> changeUserPwd(String userName, String oldPassword, String newPassword) {
    return consoleMainDao.changeUserPassword(userName, oldPassword, newPassword);
  }
}
