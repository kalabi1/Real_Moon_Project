package com.nahalit.nahalapimanager.dao;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class IN1002Dao {
    private final NamedParameterJdbcTemplate db;

    public IN1002Dao(NamedParameterJdbcTemplate db) {
        this.db = db;
    }

    public List getTrnItemList(){
        StringBuilder sql = new StringBuilder();
        sql.append(" SELECT I.ITEM_NO \"itemNo\",");
        sql.append("        I.ITEM_ID \"itemId\",");
        sql.append("        I.ITEM_NAME \"itemName\",");
        sql.append("        I.UOM_SHORT \"uomShort\",");
        sql.append("        V.UNIT_PRICE \"unitPrice\",");
        sql.append("        V.MRP \"mrp\",");
        sql.append("        V.SALE_PRICE \"salePrice\",");
        sql.append("        II.BALANCE \"balance\"");
        sql.append("   FROM IN_ITEM_V I, IN_ITEM_PRICE_V V, IN_ITEM_STOCK_V II");
        sql.append("  WHERE     I.ITEM_NO = V.ITEM_NO(+)");
        sql.append("        AND NVL (I.GROUP_FLAG, 0) <> 1");
        sql.append("        AND I.ITEM_NO = II.ITEM_NO");
        sql.append("        AND NVL (I.ACTIVE_STAT, 0) = 1");
        sql.append("        AND NVL (II.BALANCE, 0) > 0");

        Map param = new HashMap();
        return db.queryForList(sql.toString(),param);
    }
}
