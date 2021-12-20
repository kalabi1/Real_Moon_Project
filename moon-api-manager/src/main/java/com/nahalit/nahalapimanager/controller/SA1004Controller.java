package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.SaLookup;
import com.nahalit.nahalapimanager.model.SaLookupdtl;
import com.nahalit.nahalapimanager.service.SA1004Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RequestMapping(value = "api/rest/sa/setting")
@Controller
public class SA1004Controller {
  private SA1004Service sa1004Service;

  public SA1004Controller(SA1004Service sa1004Service) {
    this.sa1004Service = sa1004Service;
  }

  // Lookup Information
  @GetMapping("/lookup/")
  public ResponseEntity<List<SaLookup>> getAllLookup() {
    return new ResponseEntity<>(this.sa1004Service.getAllLookup(), HttpStatus.OK);
  }

  @GetMapping("/lookup/get-lookup")
  public ResponseEntity<SaLookup> getLookup(@RequestParam Long lookupNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(this.sa1004Service.getLookup(lookupNo), HttpStatus.OK);
  }

  @PostMapping("/lookup/add")
  public ResponseEntity<SaLookup> saveLookup(@RequestBody SaLookup saLookup) throws ParseException {
    return new ResponseEntity<>(this.sa1004Service.saveLookup(saLookup), HttpStatus.CREATED);
  }

  @PostMapping("/lookup/add-list")
  public ResponseEntity<List<SaLookup>> saveLookupList(@RequestBody List<SaLookup> saLookup) {
    return new ResponseEntity<>(this.sa1004Service.saveLookupList(saLookup), HttpStatus.CREATED);
  }

  @PutMapping("/lookup/update")
  public ResponseEntity<SaLookup> updateLookup(@RequestBody SaLookup saLookup) throws ResourceNotFoundException, ParseException {
    return new ResponseEntity<>(this.sa1004Service.updateLookup(saLookup), HttpStatus.ACCEPTED);
  }

  @DeleteMapping("/lookup/delete")
  public ResponseEntity<Map> deleLookup(@RequestParam Long lookupNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(this.sa1004Service.deleteLookup(lookupNo), HttpStatus.OK);
  }

  // Lookup DTL information
  @GetMapping("/lookupdtl/")
  public ResponseEntity<List<SaLookupdtl>> getAllLookupdtl() {
    return new ResponseEntity<>(this.sa1004Service.getAllLookupdtl(), HttpStatus.OK);
  }

  @GetMapping("/lookupdtl/list")
  public ResponseEntity<List<SaLookupdtl>> getAllLookupdtlList(@RequestParam Long lookupNo) {
    return new ResponseEntity<>(this.sa1004Service.getAllLookupdtlList(lookupNo), HttpStatus.OK);
  }

  @GetMapping("/lookupdtl/get-lookupdtl")
  public ResponseEntity<SaLookupdtl> getLookupdtl(@RequestParam Long lookupdtlNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(this.sa1004Service.getLookupdtl(lookupdtlNo), HttpStatus.OK);
  }

  @PostMapping("/lookupdtl/add")
  public ResponseEntity<SaLookupdtl> saveLookupdtl(@RequestBody SaLookupdtl saLookupdtl) throws ParseException {
    return new ResponseEntity<>(this.sa1004Service.saveLookupdtl(saLookupdtl), HttpStatus.CREATED);
  }

  @PostMapping("/lookupdtl/add-list")
  public ResponseEntity<List<SaLookupdtl>> saveLookupdtlList(@RequestBody List<SaLookupdtl> saLookupdtls) {
    return new ResponseEntity<>(this.sa1004Service.saveLookupdtlList(saLookupdtls), HttpStatus.CREATED);
  }

  @PutMapping("/lookupdtl/update")
  public ResponseEntity<SaLookupdtl> updateLookupdtl(@RequestBody SaLookupdtl saLookupdtl) throws ResourceNotFoundException, ParseException {
    return new ResponseEntity<>(this.sa1004Service.updateLookupdtl(saLookupdtl), HttpStatus.ACCEPTED);
  }

  @PutMapping("/lookupdtl/update-list")
  public ResponseEntity<List<SaLookupdtl>> updateLookupdtlList(@RequestBody List<SaLookupdtl> saLookupdtls) throws ResourceNotFoundException, ParseException {
    return new ResponseEntity<>(this.sa1004Service.updateLookupdtlList(saLookupdtls), HttpStatus.ACCEPTED);
  }

  @DeleteMapping("/lookupdtl/delete")
  public ResponseEntity<Map> deleLookupdtl(@RequestParam Long lookupdtlNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(this.sa1004Service.deleteLookupdtl(lookupdtlNo), HttpStatus.OK);
  }

  @DeleteMapping("/lookupdtl/delete-list")
  public ResponseEntity<Map> deleLookupdtlList(@RequestBody List<SaLookupdtl> saLookupdtls) throws ResourceNotFoundException {
    return new ResponseEntity<>(this.sa1004Service.deleteLookupdtlList(saLookupdtls), HttpStatus.OK);
  }
}
