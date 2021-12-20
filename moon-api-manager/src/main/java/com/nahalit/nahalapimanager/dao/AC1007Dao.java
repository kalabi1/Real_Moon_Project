package com.nahalit.nahalapimanager.dao;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class AC1007Dao {
    private final NamedParameterJdbcTemplate db;

    public AC1007Dao(NamedParameterJdbcTemplate db) {
        this.db = db;
    }

    public List getCostCenterTree(String costName) {
        StringBuilder sql = new StringBuilder();
        sql.append("            SELECT 1 \"init\",");
        sql.append("                   LEVEL \"level\",");
        sql.append("                   COST_NAME \"costName\",");
        sql.append("                   CONNECT_BY_ISLEAF \"connectByIsleaf\",");
        sql.append("                   cost_no \"costNo\",");
        sql.append("                   COST_NO_PARENT \"costNoParent\"");
        sql.append("              FROM ac_costcenter");
        sql.append("             WHERE UPPER (cost_name) LIKE UPPER ('%' || :COST_NAME || '%')");
        sql.append("        START WITH cost_no_parent IS NULL");
        sql.append("        CONNECT BY PRIOR cost_no = cost_no_parent");
        sql.append(" ORDER SIBLINGS BY cost_name");

        Map<String, String> params = new HashMap<>();
        params.put("COST_NAME", costName);

        return db.queryForList(sql.toString(), params);
    }

}
