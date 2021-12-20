package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.AppResponse;
import com.nahalit.nahalapimanager.apiconfig.AppConfig;
import com.nahalit.nahalapimanager.model.RlCustomer;
import com.nahalit.nahalapimanager.service.RLClientCommonService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/rest/rl/client/common")
public class RLClientCommonController {

  private final RLClientCommonService rlClientCommonService;

  public RLClientCommonController(RLClientCommonService rlClientCommonService) {
    this.rlClientCommonService = rlClientCommonService;
  }

  @PostMapping("/auth/login")
  public AppResponse loginCustomer(@Valid @RequestParam(required = false) String customerId, @RequestParam(required = false) String email, @RequestParam(required = false) String mobile, @RequestParam String password, @RequestParam String companyNo) {
    RlCustomer rlCustomer = rlClientCommonService.customerAuthLogin(customerId, password);
    if (rlCustomer != null) {
      rlCustomer.setPassword(null);
      String token = Jwts.builder()
              .setId("New Session")
              .setIssuer(String.valueOf(rlCustomer.getCustomerNo()))
              .setSubject("custUser")
              .setAudience(companyNo)
              .setNotBefore(Calendar.getInstance().getTime())
              .setIssuedAt(new Date())
              .signWith(SignatureAlgorithm.HS256, AppConfig.APPLICATION_JWT_PRIVATE_KEY)
              .compact();
      Map<String, String> header = new HashMap<>();
      header.put("TOKEN", token);
      return AppResponse.build(HttpStatus.OK).body(rlCustomer).message("Customer Login successfully").header(header);
    } else {
      return AppResponse.build(HttpStatus.UNAUTHORIZED).message("Not Valid Customer");
    }
  }


}

