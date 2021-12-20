package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.SlCustomer;
import com.nahalit.nahalapimanager.service.SL1001Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(value = {"api/rest/sl/customer"})
public class SL1001Controller {
  private final SL1001Service sl1001Service;

  public SL1001Controller(SL1001Service sl1001Service) {
    this.sl1001Service = sl1001Service;
  }


  // RL In Uom Setup Controller
  @GetMapping("/")
  public ResponseEntity<List<SlCustomer>> getAllSlCustomer() {
    return new ResponseEntity<>(sl1001Service.getAllSlCustomer(), HttpStatus.OK);
  }

  @GetMapping("/get-customer")
  public ResponseEntity<SlCustomer> getSlCustomer(@Valid @RequestParam("customerNo") Long customerNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(sl1001Service.getSlCustomer(customerNo), HttpStatus.OK);
  }

  @PostMapping("/add")
  public ResponseEntity<SlCustomer> saveSlCustomer(@RequestBody SlCustomer slCustomer) throws ParseException {
    return new ResponseEntity<>(sl1001Service.saveSlCustomer(slCustomer), HttpStatus.CREATED);
  }

  @PostMapping("/add-list")
  public ResponseEntity<List<SlCustomer>> saveSlCustomerList(@RequestBody List<SlCustomer> slCustomerList) {
    return new ResponseEntity<>(sl1001Service.saveSlCustomerList(slCustomerList), HttpStatus.CREATED);
  }

  @PutMapping("/update")
  public ResponseEntity<SlCustomer> updateSlCustomer(@RequestBody SlCustomer slCustomer) throws ResourceNotFoundException, ParseException {
    return new ResponseEntity<>(sl1001Service.updateSlCustomer(slCustomer), HttpStatus.ACCEPTED);
  }

  @DeleteMapping("/delete")
  public ResponseEntity<Map> deleteSlCustomer(@RequestParam Long customerNo) {

    return new ResponseEntity<>(this.sl1001Service.deleteSlCustomer(customerNo), HttpStatus.OK);
  }

}
