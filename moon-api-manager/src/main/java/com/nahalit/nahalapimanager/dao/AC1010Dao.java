package com.nahalit.nahalapimanager.dao;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Repository
public class AC1010Dao {
  private final NamedParameterJdbcTemplate db;

  public AC1010Dao(NamedParameterJdbcTemplate db) {
    this.db = db;
  }

  public void updatePostStatus(Long vNo, Long postBy, Date postDate, Integer postFlag) {
    StringBuilder sql;
    if (postFlag == 1) {
      sql = new StringBuilder();
      sql.append(" UPDATE AC_VOUCHER SET POST_FLAG  = 1,");
      sql.append(" POST_BY=:POST_BY, POST_DATE=:POST_DATE");
      sql.append(" WHERE V_NO=:V_NO");
    } else {
      sql = new StringBuilder();
      sql.append(" UPDATE AC_VOUCHER SET POST_FLAG  = 0,");
      sql.append(" POST_BY=null, POST_DATE=null");
      sql.append(" WHERE V_NO=:V_NO");

    }

    Map params = new HashMap<>();
    params.put("V_NO", vNo);
    params.put("POST_BY", postBy);
    params.put("POST_DATE", postDate);
    params.put("POST_FLAG", postFlag);

    db.update(sql.toString(), params);

  }


}
