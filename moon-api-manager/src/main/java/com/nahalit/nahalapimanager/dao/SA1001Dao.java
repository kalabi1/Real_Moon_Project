package com.nahalit.nahalapimanager.dao;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class SA1001Dao {
    private final NamedParameterJdbcTemplate db;

    public SA1001Dao(NamedParameterJdbcTemplate db) {
        this.db = db;
    }

    public Map getSpellOut(Double value) {
        Map<String, Double> params = new HashMap<>();
        params.put("VALUE", value);

        StringBuilder sql = new StringBuilder();
        sql.append("SELECT F_SPELLOUT(:VALUE) \"spellout\" FROM DUAL");

        return db.queryForMap(sql.toString(), params);
    }
}
