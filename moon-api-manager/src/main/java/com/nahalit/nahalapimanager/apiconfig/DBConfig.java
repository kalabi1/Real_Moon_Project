package com.nahalit.nahalapimanager.apiconfig;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class DBConfig {

  @Bean(name = "mainDataSource")
  @Primary
  public DataSource mainDataSource() {
    HikariConfig config = new HikariConfig();
    config.setJdbcUrl("jdbc:oracle:thin:@18.136.211.60:1521/xe");
    config.setUsername("moon");
    config.setPassword("moon");
    config.setDriverClassName("oracle.jdbc.driver.OracleDriver");
    config.setConnectionTimeout(60000);
    config.setMaximumPoolSize(10);
    return new HikariDataSource(config);
  }

  @Bean(name = "mainTamplate")
  public JdbcTemplate mainTemplate(@Qualifier("mainDataSource") DataSource mainDataSource) {
    JdbcTemplate jdbcTemplate = new JdbcTemplate(mainDataSource);
    jdbcTemplate.setMaxRows(200);
    return jdbcTemplate;
  }

}
