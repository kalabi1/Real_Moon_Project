package com.nahalit.nahalapimanager.dao;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class AC1006Dao {
    private final NamedParameterJdbcTemplate db;

    public AC1006Dao(NamedParameterJdbcTemplate db) {
        this.db = db;
    }


    public List getAccTreeList() {
        StringBuilder sql = new StringBuilder();
        Map params = new HashMap<>();

        sql.append("            SELECT 1 \"init\",");
        sql.append("                   LEVEL \"level\",");
        sql.append("                   name1 || ' ' || acc_code \"accName\",");
        sql.append("                   acc_no \"accNo\",");
        sql.append("                   CONNECT_BY_ISLEAF \"connectByIsleaf\",");
        sql.append("                   parent_acc_no \"parentAccNo\"");
        sql.append("              FROM (SELECT TO_CHAR (a.acc_no) acc_no,");
        sql.append("                           NVL (TO_CHAR (a.parent_acc_no), 'P' || b.nature_no)");
        sql.append("                              parent_acc_no,");
        sql.append("                           DECODE (NVL (a.active, 0),");
        sql.append("                                   1, a.acc_name,");
        sql.append("                                   0, 'X' || a.acc_name)");
        sql.append("                              name1,");
        sql.append("                           a.active,");
        sql.append("                           a.acc_code");
        sql.append("                      FROM AC_CHART a, AC_NATURE b");
        sql.append("                     WHERE a.NATURE_NO = b.NATURE_NO");
        sql.append("                    UNION");
        sql.append("                    SELECT ('P' || nature_no) acc_no,");
        sql.append("                           NULL parent_acc_no,");
        sql.append("                           nature_name name1,");
        sql.append("                           NULL active,");
        sql.append("                           nature_code acc_code");
        sql.append("                      FROM AC_NATURE)");
        sql.append("        START WITH parent_acc_no IS NULL");
        sql.append("        CONNECT BY PRIOR acc_no = parent_acc_no");
        sql.append(" ORDER SIBLINGS BY acc_code");

        return db.queryForList(sql.toString(), params);
    }
}
