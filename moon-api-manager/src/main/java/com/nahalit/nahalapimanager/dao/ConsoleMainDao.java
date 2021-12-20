package com.nahalit.nahalapimanager.dao;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class ConsoleMainDao {
  private final NamedParameterJdbcTemplate db;

  public ConsoleMainDao(NamedParameterJdbcTemplate db) {
    this.db = db;
  }

  public Map<String, Object> consoleMainLogin(String userName, String userPassword) {
    StringBuilder sql = new StringBuilder();
    sql.append(" SELECT USER_NO, USER_NAME");
    sql.append(" FROM SA_USER");
    sql.append(" WHERE NVL(ACTIVE_STAT, 0) = 1");
    sql.append("   AND USER_NAME = :USER_NAME");
    sql.append("   AND USER_PWD = F_USER_PWD(:USER_PWD)");

    Map<String, String> params = new HashMap<>();
    params.put("USER_NAME", userName);
    params.put("USER_PWD", userPassword);

    Map<String, Object> exceptionMessage = new HashMap<>();

    try {
      return db.queryForMap(sql.toString(), params);
    } catch (Exception e) {
      exceptionMessage.put("loginStatus", 0);
      return exceptionMessage;
    }
  }


  public Map<String, Object> changeUserPassword(String userName, String oldPassword, String newPassword) {

    StringBuilder sql = new StringBuilder();

    sql.append(" UPDATE SA_USER");
    sql.append(" SET USER_PWD=F_USER_PWD(:NEW_USER_PWD)");
    sql.append(" WHERE USER_NAME = :USER_NAME");
    sql.append("   AND USER_PWD = F_USER_PWD(:OLD_USER_PDW)");

    Map<String, String> params = new HashMap<>();
    params.put("USER_NAME", userName);
    params.put("OLD_USER_PDW", oldPassword);
    params.put("NEW_USER_PWD", newPassword);

    Map<String, Object> queryStatus = new HashMap<>();

    if (db.update(sql.toString(), params) == 1) {
      queryStatus.put("pwdUpdateStatus", true);
      return queryStatus;
    } else {
      queryStatus.put("pwdUpdateStatus", false);
      return queryStatus;
    }
  }
}
