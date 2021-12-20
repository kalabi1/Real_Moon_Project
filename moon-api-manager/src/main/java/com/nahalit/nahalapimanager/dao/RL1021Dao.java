package com.nahalit.nahalapimanager.dao;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class RL1021Dao {
    private final NamedParameterJdbcTemplate db;

    public RL1021Dao(NamedParameterJdbcTemplate db) {
        this.db = db;
    }

    public String getCollId(Date collDate) {
        Map<String, Date> params = new HashMap<>();
        params.put("COLL_DATE", collDate);

        StringBuilder sql = new StringBuilder();
        sql.append(" SELECT 'COL' || TO_CHAR (:COLL_DATE, 'RRMM')");
        sql.append("        || TO_CHAR (");
        sql.append("              LPAD (");
        sql.append("                 NVL (");
        sql.append("                    (SELECT TO_NUMBER (MAX (SUBSTR (COLL_ID, 8)))");
        sql.append("                       FROM rl_collection");
        sql.append("                      WHERE TO_CHAR (COLL_DATE, 'MMRR') =");
        sql.append("                               TO_CHAR (:COLL_DATE, 'MMRR')");
        sql.append("                            AND SUBSTR (COLL_ID, 1, 3) = 'COL'),");
        sql.append("                    0)");
        sql.append("                 + 1,");
        sql.append("                 4,");
        sql.append("                 0))");
        sql.append("           ID");
        sql.append("   FROM DUAL");

        Map trnId = db.queryForMap(sql.toString(), params);
        return trnId.get("ID").toString();

    }

    public List getTrnBalanceList() {
        Map<String, String> params = new HashMap<>();

        StringBuilder sql = new StringBuilder();
        sql.append(" SELECT CUSTOMER_NAME         \"customerName\",");
        sql.append("        CUSTOMER_ID           \"customerId\",");
        sql.append("        MOBILE                \"mobile\",");
        sql.append("        TRN_NO                \"trnNo\",");
        sql.append("        TRN_ID                \"trnId\",");
        sql.append("        TRN_DATE              \"trnDate\",");
        sql.append("        CUSTOMER_NO           \"customerNo\",");
        sql.append("        SETTLEMENT_PRICE      \"settlementPrice\",");
        sql.append("        BOOKING_AMOUNT        \"bookingAmount\",");
        sql.append("        COLLECTION_AMOUNT     \"collectionAmount\",");
        sql.append("        DOWN_PAYMENT_AMOUNT     \"downPaymentAmount\",");
        sql.append("        DUE_AMOUNT            \"dueAmount\"");
        sql.append("   FROM rl_trn_balance_v");

        return db.queryForList(sql.toString(), params);

    }
}
