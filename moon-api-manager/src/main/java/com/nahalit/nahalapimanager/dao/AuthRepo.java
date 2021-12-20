package com.nahalit.nahalapimanager.dao;

import com.nahalit.nahalapimanager.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository(value = "coreAuthRepo")
public class AuthRepo {
  @Autowired
  private NamedParameterJdbcTemplate db;
  public User findUser(String userName, String password, Long companyNo ){

    StringBuilder sql =new StringBuilder();
    sql.append(" SELECT U.USER_NO,");
    sql.append("        E.EMP_NO,");
    sql.append("        U.USER_NAME,");
    sql.append("        E.EMP_ID,");
    sql.append("        E.EMP_NAME,");
    sql.append("        '' SESSION_KEY,");
    sql.append("        :COMPANY_NO");
    sql.append("           COMPANY_NO,");
    sql.append("        (SELECT C.COMPANY_NAME");
    sql.append("         FROM SA_COMPANY C");
    sql.append("         WHERE C.COMPANY_NO= :COMPANY_NO)");
    sql.append("           COMPANY_NAME,");
    sql.append("        :PASSWORD");
    sql.append("           PASSWORD");
    sql.append(" FROM SA_USER U,");
    sql.append("      HR_EMP_V E");
    sql.append(" WHERE U.USER_NO = E.EMP_NO");
    sql.append("   AND upper(U.USER_NAME) = upper(:USER_NAME)");
    sql.append("   AND U.USER_PWD = F_USER_PWD(:PASSWORD)");

    Map<String, Object> params= new HashMap<>();
    params.put("USER_NAME", userName);
    params.put("PASSWORD", password);
    params.put("COMPANY_NO", companyNo);

    try {
      return (User) db.queryForObject(sql.toString(), params, new BeanPropertyRowMapper(User.class));
    } catch (Exception e) {
      return null;
    }
  }

  public List findAllCompanyByUserName(String userName){
    StringBuilder sql =new StringBuilder();
    sql.append(" SELECT U.USER_NAME, C.COMPANY_NO, C.COMPANY_NAME, M.COMPANY_WEBSITE ");
    sql.append("   FROM SA_USER U, SA_GRANTCOMPANY_V C, SA_COMPANY M ");
    sql.append("  WHERE U.USER_NO = C.USER_NO ");
    sql.append("    AND C.COMPANY_NO = M.COMPANY_NO ");
    sql.append("    AND UPPER (U.USER_NAME) = UPPER(:USER_NAME) ");
    Map<String, Object> params= new HashMap<>();
    params.put("USER_NAME", userName);
    return db.queryForList(sql.toString(), params);
  }
}
