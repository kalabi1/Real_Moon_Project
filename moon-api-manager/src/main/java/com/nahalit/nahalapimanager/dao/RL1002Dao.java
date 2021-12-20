package com.nahalit.nahalapimanager.dao;

import com.nahalit.nahalapimanager.service.EmailService;
import com.nahalit.nahalapimanager.utillibrary.RandomString;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class RL1002Dao {
    private final NamedParameterJdbcTemplate db;
    private final JdbcTemplate jdbcTemplate;
    private final EmailService emailService;

    public RL1002Dao(NamedParameterJdbcTemplate db, JdbcTemplate jdbcTemplate, EmailService emailService) {
        this.db = db;
        this.jdbcTemplate = jdbcTemplate;
        this.emailService = emailService;
    }

    public String getCustomerId() {
        StringBuilder sql = new StringBuilder();
        Map<String, String> params = new HashMap<>();
        sql.append(" SELECT 'CI-' || LPAD(nvl(MAX(TO_NUMBER(SUBSTR(CUSTOMER_ID, 4))),0) + 1, 4, 0) ID");
        sql.append(" FROM RL_CUSTOMER");

        Map mapCustomerId = db.queryForMap(sql.toString(), params);
        return mapCustomerId.get("ID").toString();
    }

    public Map<String, Object> isCustomerLogin(String customerUsername, String password) {
        StringBuilder sql = new StringBuilder();
        Map<String, String> params = new HashMap<>();
        params.put("customerUsername", customerUsername);
        params.put("password", password);

        Map<String, Object> exceptionMessage = new HashMap<>();

        sql.append(" select CUSTOMER_NO,CUSTOMER_ID,CUSTOMER_NAME,EMAIL,MOBILE");
        sql.append("             from RlCustomer");
        sql.append("             where (UPPER(CUSTOMER_ID) = UPPER(:customerUsername) and PASSWORD = :password)");
        sql.append("                or (LOWER(EMAIL) = LOWER(:customerUsername) and PASSWORD = :password)");

        try {
            return db.queryForMap(sql.toString(), params);
        } catch (Exception e) {
            exceptionMessage.put("loginStatus", 0);
            return exceptionMessage;
        }
    }

    public Map getHasEmail(String email) {
        Map<String, String> params = new HashMap<>();
        params.put("EMAIL", email);

        return db.queryForMap("SELECT NVL((SELECT COUNT(1) FROM RL_CUSTOMER WHERE EMAIL=:EMAIL),0) \"emailFlag\" FROM DUAL", params);

    }

    public Map getHasMobile(String mobile) {
        Map<String, String> params = new HashMap<>();
        params.put("MOBILE", mobile);

        return db.queryForMap("SELECT NVL((SELECT COUNT(1) FROM RL_CUSTOMER WHERE MOBILE=:MOBILE),0) \"mobileFlag\" FROM DUAL", params);

    }

    public String forgotPasswordByMail(String email) {
        Map<String, String> params = new HashMap();
        String randomPassword = RandomString.randomAlphaNumeric(8);
        params.put("EMAIL", email);
        params.put("NEWPASSWORD", randomPassword);
        try {
            int executeStatus = db.update("UPDATE RL_CUSTOMER SET PASSWORD=:NEWPASSWORD WHERE EMAIL=:EMAIL", params);
            if (executeStatus == 1) {
                String[] sendTo = email.trim().split(" ");
                emailService.sendEmail(sendTo, null, null, "Forgot Your Password", "Your updated password: " + randomPassword, false);
                return "Send New Password to " + email;
            } else {
                return "User not found for this email " + email;
            }
        } catch (Exception e) {
            return "User not found for this email " + email;
        }
    }
}
