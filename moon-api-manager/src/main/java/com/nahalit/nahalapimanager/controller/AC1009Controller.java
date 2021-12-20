package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.service.AC1009Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Map;

@RequestMapping(value = "api/rest/ac/voucher/")
@RestController
public class AC1009Controller {
  private final AC1009Service ac1009Service;

  public AC1009Controller(AC1009Service ac1009Service) {
    this.ac1009Service = ac1009Service;

  }

  // AC Voucher Check

  @PutMapping("/update/check-status")
  public ResponseEntity<Map> updateCheckStatus(@RequestParam Long vNo,@RequestParam Integer checkFlag) throws ParseException {
    return new ResponseEntity<>(this.ac1009Service.updateCheckStatus(vNo, checkFlag), HttpStatus.ACCEPTED);
  }

}
