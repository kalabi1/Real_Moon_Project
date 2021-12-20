package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.RlItem;
import com.nahalit.nahalapimanager.service.RL1007Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RequestMapping(value = "api/rest/rl/item/land")
@RestController
public class RL1007Controller {

  private final RL1007Service rl1007Service;

  public RL1007Controller(RL1007Service rl1007Service) {
    this.rl1007Service = rl1007Service;
  }

  // RL Item Controller
  @GetMapping("/")
  public ResponseEntity<List> getAllLandItem(@RequestParam(value = "itemNo", required = false) String itemNo,@RequestParam(value = "projectNo", required = false) String projectNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(this.rl1007Service.getAllLandItem(itemNo,projectNo), HttpStatus.OK);
  }

  @GetMapping("/get-item")
  public ResponseEntity<Object> getALandItem(@RequestParam String itemNo) {
    return new ResponseEntity<>(this.rl1007Service.getLandItem(itemNo), HttpStatus.OK);
  }

  @PostMapping("/add")
  public ResponseEntity<RlItem> saveLandItem(@RequestBody RlItem rlItem) throws ParseException {
    return new ResponseEntity<>(this.rl1007Service.saveLandRlItem(rlItem), HttpStatus.CREATED);
  }

  @PutMapping("/update")
  public ResponseEntity<RlItem> updateLandItem(@RequestBody RlItem reItem) throws ResourceNotFoundException, ParseException, IOException {
    return new ResponseEntity<>(rl1007Service.updateLandRlItem(reItem), HttpStatus.ACCEPTED);
  }

  @DeleteMapping("/delete")
  public ResponseEntity<Map> deleteLandItem(@RequestParam Long itemNo) throws IOException {
    return new ResponseEntity<>(this.rl1007Service.deleteLandRlItem(itemNo), HttpStatus.OK);
  }

  @GetMapping("get-featured-item")
  public ResponseEntity<List> getLandFeatureProperty(@RequestParam Long itemNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(this.rl1007Service.getFeatureProperty(itemNo), HttpStatus.OK);
  }
}
