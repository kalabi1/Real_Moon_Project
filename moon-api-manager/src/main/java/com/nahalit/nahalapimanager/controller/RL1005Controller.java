package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.RlItem;
import com.nahalit.nahalapimanager.service.RL1005Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RequestMapping(value = "api/rest/rl/item/ap")
@RestController
public class RL1005Controller {

  private final RL1005Service rL1005Service;

  @Autowired
  public RL1005Controller(RL1005Service RL1005Service) {
    this.rL1005Service = RL1005Service;
  }

  // RL Item Controller
  @GetMapping("/")
  public ResponseEntity<List> getAllItem(@RequestParam(value = "itemNo", required = false) String itemNo,@RequestParam(value = "projectNo", required = false) String projectNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(this.rL1005Service.getAllApItem(itemNo,projectNo), HttpStatus.OK);
  }

  @GetMapping("/get-item")
  public ResponseEntity<Object> getAPItem(@RequestParam String itemNo) {
    return new ResponseEntity<>(this.rL1005Service.getApItem(itemNo), HttpStatus.OK);
  }

  @PostMapping("/add")
  public ResponseEntity<RlItem> saveItem(@RequestBody RlItem rlItem) throws ParseException {
    return new ResponseEntity<>(this.rL1005Service.saveApRlItem(rlItem), HttpStatus.CREATED);
  }

  @PutMapping("/update")
  public ResponseEntity<RlItem> updateItem(@RequestBody RlItem reItem) throws ResourceNotFoundException, ParseException, IOException {
    return new ResponseEntity<>(rL1005Service.updateApRlItem(reItem), HttpStatus.ACCEPTED);
  }

  @DeleteMapping("/delete")
  public ResponseEntity<Map> deleteItem(@RequestParam Long itemNo) throws IOException {
    return new ResponseEntity<>(this.rL1005Service.deleteApRlItem(itemNo), HttpStatus.OK);
  }

  @GetMapping("get-featured-item")
  public ResponseEntity<List> getApFeatureProperty(@RequestParam Long itemNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(this.rL1005Service.getFeatureProperty(itemNo), HttpStatus.OK);
  }
}
