package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.dao.AC1010Dao;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

@Service
public class AC1010Service {
  private final AC1010Dao ac1010Dao;
  private final AuthService authService;

  public AC1010Service(AC1010Dao ac1010Dao, AuthService authService) {
    this.ac1010Dao = ac1010Dao;
    this.authService = authService;
  }

  public Map updatePostStatus(Long vNo, Integer postFlag) throws ParseException {

    Map<String, String> updateMessage = new HashMap<>();
    updateMessage.put("updateStatus", "Voucher Posted Successfully.");

    ac1010Dao.updatePostStatus(vNo, authService.getEmpNo(), UtillDate.getDateTime(), postFlag);
    return updateMessage;
  }
}
