package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.InUom;
import com.nahalit.nahalapimanager.service.IN1001Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = {"api/rest/in/configuration"})
public class IN1001Controller {
  private final IN1001Service  in1001Service;

  public IN1001Controller(IN1001Service in1001Service) {
    this.in1001Service = in1001Service;
  }


  // RL In Uom Setup Controller
  @GetMapping("/uom/")
  public ResponseEntity<List<InUom>> getAllUom() {
    return new ResponseEntity<>(in1001Service.getAllInUom(), HttpStatus.OK);
  }

  @GetMapping("/uom/get-uom")
  public ResponseEntity<InUom> getInUom(@Valid @RequestParam("uomNo") Long uomNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(in1001Service.getInUom(uomNo), HttpStatus.OK);
  }

  @PostMapping("/uom/add")
  public ResponseEntity<InUom> saveInUom(@RequestBody InUom inUom) throws ParseException {
    return new ResponseEntity<>(in1001Service.saveInUom(inUom), HttpStatus.CREATED);
  }

  @PostMapping("/uom/add-list")
  public ResponseEntity<List<InUom>> saveInUomList(@RequestBody List<InUom> inUomList) {
    return new ResponseEntity<>(in1001Service.saveInUomList(inUomList), HttpStatus.CREATED);
  }

  @PutMapping("/uom/update")
  public ResponseEntity<InUom> updateInUom(@RequestBody InUom inUom) throws ResourceNotFoundException, ParseException {
    return new ResponseEntity<>(in1001Service.updateInUom(inUom), HttpStatus.ACCEPTED);
  }

  @DeleteMapping("/uom/delete")
  public ResponseEntity<Map> deleteInUom(@RequestParam Long uomNo) {

    return new ResponseEntity<>(this.in1001Service.deleteInUom(uomNo), HttpStatus.OK);
  }

}
