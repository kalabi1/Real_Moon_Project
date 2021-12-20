package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class User {
  private Long USER_NO;
  private String USER_NAME;
  private String USER_TYPE;
  private String EMP_ID;
  private Long EMP_NO;
  private String EMP_NAME;
  private String JOBTITLE;
  private String BU_NAME;
  private String SESSION_KEY;
  private Long COMPANY_NO;
  private String COMPANY_NAME;
  private String PASSWORD;

}
