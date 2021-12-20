package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.service.AC1010Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.Map;

@RequestMapping(value = "api/rest/ac/voucher/")
@RestController
public class AC1010Controller {
    private final AC1010Service ac1010Service;

    public AC1010Controller(AC1010Service ac1010Service) {
        this.ac1010Service = ac1010Service;
    }

    // AC Voucher Post

    @PutMapping("/update/post-status")
    public ResponseEntity<Map> updatePostStatus(@RequestParam Long vNo,@RequestParam Integer postFlag) throws ParseException {
        return new ResponseEntity<>(this.ac1010Service.updatePostStatus(vNo,postFlag), HttpStatus.ACCEPTED);
    }
}
