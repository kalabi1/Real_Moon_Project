package com.nahalit.nahalapimanager.dao;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class RL1018Dao {
    private final NamedParameterJdbcTemplate db;

    public RL1018Dao(NamedParameterJdbcTemplate db) {
        this.db = db;
    }

    public void updateReadStatus(Long contactNo) {
        StringBuilder sql = new StringBuilder();
        sql.append("UPDATE RL_PROPERTY_CONTACT SET READ_FLAG = 1 WHERE CONTACT_NO=:CONTACT_NO");

        Map<String, Long> params = new HashMap<>();
        params.put("CONTACT_NO", contactNo);

        db.update(sql.toString(), params);
    }
    public void updateUnReadStatus(Long contactNo) {
        StringBuilder sql = new StringBuilder();
        sql.append("UPDATE RL_PROPERTY_CONTACT SET READ_FLAG = 0 WHERE CONTACT_NO=:CONTACT_NO");

        Map<String, Long> params = new HashMap<>();
        params.put("CONTACT_NO", contactNo);

        db.update(sql.toString(), params);
    }
}
