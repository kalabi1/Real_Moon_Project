package com.nahalit.nahalapimanager.apiconfig;

public class AppConfig {
  public static final String CONTEXT_PATH = "/nahal/v1";
  public static final String SERVER_PORT = "8183";
  public static String[] NONFILTERRING_PATH_PATTERNS = new String[]{
      "/api/rest/rl/client/common/auth/login**",
      "/api/rest/core/auth/login**",
      "/api/rest/rl/customer/add",
      "/api/rest/rl/property-contact/add",
      "/api/rest/files/**",
      "/api/rest/core/auth/**",
      "/api/rest/rl/cu/item/**",
      "/api/rest/sa/setting/region/",
      "/api/rest/rl/cu/project/**",
      "/api/rest/email/send-mail",
      "/api/rest/sa/message/get-messag**",
      "/api/rest/sa/gallery/",
      "/**/*get-**",
      ",/csrf", "/v2/api-docs", "/swagger-resources/configuration/ui",
      "/configuration/ui", "/swagger-resources",
      "/swagger-resources/configuration/security", "/configuration/security",
      "/swagger-ui.html", "/webjars/**"};
  public static String[] FILTERRING_PATH_PATTERNS = new String[]{"/**"};
  public static final String APPLICATION_JWT_PRIVATE_KEY = "0E041573DA7FEBD98D5679005566D9584DB9FB638C2C411BA94DE612E519C411";

}
