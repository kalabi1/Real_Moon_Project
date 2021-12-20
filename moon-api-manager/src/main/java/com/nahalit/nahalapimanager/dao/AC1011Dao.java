package com.nahalit.nahalapimanager.dao;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class AC1011Dao {
    private final NamedParameterJdbcTemplate db;

    public AC1011Dao(NamedParameterJdbcTemplate db) {
        this.db = db;
    }

    public List getAccBalanceList() {
        StringBuilder sql = new StringBuilder();
        sql.append("   SELECT NATURE_CODE \"natureCode\",");
        sql.append("          NATURE_NAME \"natureName\",");
        sql.append("          ACC_CODE \"accCode\",");
        sql.append("          ACC_NAME \"accName\",");
        sql.append("          ACC_NAME_WITHOUT_CODE \"accNameWithoutCode\",");
        sql.append("          ACC_PATH \"accPath\",");
        sql.append("          active \"active\",");
        sql.append("          f_acc_Balance (acc_no,");
        sql.append("                         SYSDATE,");
        sql.append("                         NULL,");
        sql.append("                         ba_no)");
        sql.append("             \"balance\"");
        sql.append("     FROM AC_CHART_V C");
        sql.append(" ORDER BY ACC_NO");

        Map params = new HashMap<>();

        return db.queryForList(sql.toString(), params);
    }
}
