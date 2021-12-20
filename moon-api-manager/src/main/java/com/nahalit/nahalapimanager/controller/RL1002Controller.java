package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.AppResponse;
import com.nahalit.nahalapimanager.apiconfig.AppConfig;
import com.nahalit.nahalapimanager.model.RlCustomer;
import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.SaLookupdtl;
import com.nahalit.nahalapimanager.service.RL1002Service;
import com.nahalit.nahalapimanager.service.SA1004Service;
import com.nahalit.nahalapimanager.storage.StorageService;
import com.nahalit.nahalapimanager.utillibrary.RandomString;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RequestMapping(value = "api/rest/rl/customer")
@RestController
public class RL1002Controller {
    private final RL1002Service rl1002Service;


    public RL1002Controller(RL1002Service rl1002Service) {
        this.rl1002Service = rl1002Service;
    }

    @GetMapping("/")
    public ResponseEntity<List<RlCustomer>> getAllCustomer() {
        return new ResponseEntity<>(rl1002Service.getAllCustomer(), HttpStatus.OK);
    }

    @GetMapping("/get-customer")
    public ResponseEntity<RlCustomer> getCustomer(@RequestParam(value = "customerNo", required = false) Long customerNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(rl1002Service.getCustomer(customerNo), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<RlCustomer> saveCustomer(@Valid @RequestParam(value = "customerPhoto", required = false) MultipartFile customerPhoto, RlCustomer customer) throws ParseException {
        return new ResponseEntity<>(rl1002Service.saveCustomer(customer, customerPhoto), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<RlCustomer> updateCustomer(@Valid @RequestParam(value = "customerPhoto", required = false) MultipartFile customerPhoto, RlCustomer customer) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(rl1002Service.updateCustomer(customer, customerPhoto), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map> deleteCustomer(@RequestParam Long customerNo) throws ResourceNotFoundException, IOException {
        return new ResponseEntity<>(rl1002Service.deleteCustomer(customerNo), HttpStatus.OK);
    }

//  @PostMapping("/auth/login")
//  public Map<String, Object> loginCustomer(@Valid @RequestParam String customerId,@RequestParam String email,@RequestParam String mobile, @RequestParam String password) {
//    return rl1002Service.customerLogin(customerId, password);
//  }


    @PostMapping("/forgot-password")
    public String forgotPassword(@Valid @RequestParam String forgotMailOrMobile) {
        String regex = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";
        if (forgotMailOrMobile.matches(regex)) {
            return rl1002Service.forgotPasswordByMail(forgotMailOrMobile);
        } else
            return "Not email: " + RandomString.randomAlphaNumeric(8);
    }

    @GetMapping("/get-hasemail")
    public ResponseEntity<Map> getHasEmail(@Valid @RequestParam(value = "email") String email) {
        return new ResponseEntity<>(rl1002Service.getHasEmail(email), HttpStatus.OK);
    }

    @GetMapping("/get-hasmobile")
    public ResponseEntity<Map> getHasMobile(@Valid @RequestParam(value = "mobile") String mobile) {
        return new ResponseEntity<>(rl1002Service.getHasMobile(mobile), HttpStatus.OK);
    }


}

