package com.nahalit.nahalapimanager.dao;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Repository
public class AC1009Dao {
  private final NamedParameterJdbcTemplate db;

  public AC1009Dao(NamedParameterJdbcTemplate db) {
    this.db = db;
  }

  public void updateCheckStatus(Long vNo, Long checkBy, Date checkFate, Integer checkFlag) {
    StringBuilder sql;

    if (checkFlag == 1) {
      sql = new StringBuilder();
      sql.append(" UPDATE AC_VOUCHER SET CHECK_FLAG  = :CHECK_FLAG,");
      sql.append(" CHECK_BY=:CHECK_BY, CHECK_DATE = :CHECK_DATE");
      sql.append(" WHERE V_NO=:V_NO");
    } else {
      sql = new StringBuilder();
      sql.append(" UPDATE AC_VOUCHER SET CHECK_FLAG = null,");
      sql.append(" CHECK_BY=null, CHECK_DATE = null");
      sql.append(" WHERE V_NO=:V_NO");
    }


    Map params = new HashMap<>();
    params.put("V_NO", vNo);
    params.put("CHECK_BY", checkBy);
    params.put("CHECK_DATE", checkFate);
    params.put("CHECK_FLAG", checkFlag);

    db.update(sql.toString(), params);
  }

}
