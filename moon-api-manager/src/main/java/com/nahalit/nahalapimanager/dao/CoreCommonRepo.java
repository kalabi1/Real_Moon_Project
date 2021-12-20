package com.nahalit.nahalapimanager.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository(value = "coreCommonRepo")
public class CoreCommonRepo {
  @Autowired
  private NamedParameterJdbcTemplate db;

  public List getMenu(Long companyNo, Long empNo, String menuType) {
    StringBuilder sql = new StringBuilder();
    sql.append(" WITH MENU");
    sql.append("      AS (    SELECT DISTINCT 'M' || MENU_NO OBJ_NO,");
    sql.append("                              MENU_NAME OBJ_NAME,");
    sql.append("                              SL_NO,");
    sql.append("                              'M' || PARENT_MENU_NO PARENT_OBJ_NO,");
    sql.append("                              MENU_ID");
    sql.append("                FROM SA_MENU M");
    sql.append("               WHERE ACTIVE_STAT = 1");
    sql.append("          START WITH EXISTS");
    sql.append("                        (SELECT 1");
    sql.append("                           FROM SA_ROLEDTL RD, SA_SUBMENU SM");
    sql.append("                          WHERE M.MENU_NO = SM.MENU_NO");
    sql.append("                                AND RD.SUBMENU_NO = SM.SUBMENU_NO");
    sql.append("                                AND SM.SUBMENU_TYPE =");
    sql.append("                                       NVL (:SUBMENU_TYPE, 'F')");
    sql.append("                                AND RD.ROLE_NO =");
    sql.append("                                       (SELECT ROLE_NO");
    sql.append("                                          FROM SA_GRANTROLE");
    sql.append("                                         WHERE USER_NO = :USER_NO");
    sql.append("                                               AND COMPANY_NO =");
    sql.append("                                                      :COMPANY_NO))");
    sql.append("          CONNECT BY MENU_NO = PRIOR PARENT_MENU_NO)");
    sql.append("            SELECT 1 INIT,");
    sql.append("                   LEVEL LVL,");
    sql.append("                   OBJ_NAME,");
    sql.append("                   CASE");
    sql.append("                      WHEN SUBSTR (OBJ_NO, 1, 1) = 'M' AND LEVEL = 1 THEN 'SIT1'");
    sql.append("                      WHEN SUBSTR (OBJ_NO, 1, 1) = 'M' AND LEVEL > 1 THEN 'SIT2'");
    sql.append("                      ELSE 'yellow_dot'");
    sql.append("                   END");
    sql.append("                      ICON,");
    sql.append("                   OBJ_NO,");
    sql.append("                   MENU_ID,");
    sql.append("                   SUBSTR (SYS_CONNECT_BY_PATH (OBJ_NAME, '/'), 2) MENU_PATH,CONNECT_BY_ISLEAF \"connectByIsleaf\",PARENT_OBJ_NO \"parentObjNo\"");
    sql.append("              FROM (SELECT OBJ_NO,");
    sql.append("                           OBJ_NAME,");
    sql.append("                           SL_NO,");
    sql.append("                           PARENT_OBJ_NO,");
    sql.append("                           MENU_ID");
    sql.append("                      FROM MENU");
    sql.append("                    UNION ALL");
    sql.append("                    SELECT TO_CHAR (RD.SUBMENU_NO) OBJ_NO,");
    sql.append("                           SM.SUBMENU_NAME_USER OBJ_NAME,");
    sql.append("                           SM.SL_NO,");
    sql.append("                           'M' || SM.MENU_NO PARENT_OBJ_NO,");
    sql.append("                           SUBMENU_ID");
    sql.append("                      FROM SA_ROLEDTL RD, SA_SUBMENU SM");
    sql.append("                     WHERE RD.SUBMENU_NO = SM.SUBMENU_NO");
    sql.append("                           AND SM.SUBMENU_TYPE = NVL (:SUBMENU_TYPE, 'F')");
    sql.append("                           AND RD.ROLE_NO IN");
    sql.append("                                  (SELECT ROLE_NO");
    sql.append("                                     FROM SA_GRANTROLE");
    sql.append("                                    WHERE USER_NO = :USER_NO");
    sql.append("                                          AND COMPANY_NO = :COMPANY_NO))");
    sql.append("        START WITH PARENT_OBJ_NO = 'M'");
    sql.append("        CONNECT BY PRIOR OBJ_NO = PARENT_OBJ_NO");
    sql.append(" ORDER SIBLINGS BY SL_NO");

    Map<String, Object> params = new HashMap<>();
    params.put("COMPANY_NO", companyNo);
    params.put("USER_NO", empNo);
    params.put("SUBMENU_TYPE", menuType);
    return db.queryForList(sql.toString(), params);
  }
}

