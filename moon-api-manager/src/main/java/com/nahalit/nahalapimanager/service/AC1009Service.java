package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.dao.AC1009Dao;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

@Service
public class AC1009Service {
  private final AC1009Dao ac1009Dao;
  private final AuthService authService;

  public AC1009Service(AC1009Dao ac1009Dao, AuthService authService) {
    this.ac1009Dao = ac1009Dao;
    this.authService = authService;
  }

  public Map updateCheckStatus(Long vNo, Integer checkFlag) throws ParseException {

    Map<String, String> updateMessage = new HashMap<>();
    updateMessage.put("updateStatus", "Voucher Checked Successfully.");

    ac1009Dao.updateCheckStatus(vNo, authService.getEmpNo(), UtillDate.getDateTime(), checkFlag);
    return updateMessage;
  }



}
