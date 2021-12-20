package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.service.AC1011Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RequestMapping(value = "api/rest/ac/ledger/")
@RestController
public class AC1011Controller {
    private final AC1011Service ac1011Service;

    public AC1011Controller(AC1011Service ac1011Service) {
        this.ac1011Service = ac1011Service;
    }

    // AC Ledger Balance

    @GetMapping("/balance/balance-list")
    public ResponseEntity<List> getAccBalanceList() throws ParseException {
        return new ResponseEntity<>(this.ac1011Service.getAccBalanceList(), HttpStatus.OK);
    }

}
