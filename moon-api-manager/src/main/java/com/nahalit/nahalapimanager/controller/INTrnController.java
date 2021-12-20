package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.InTrn;
import com.nahalit.nahalapimanager.model.InTrndtl;
import com.nahalit.nahalapimanager.service.INTrnService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(value = {"api/rest/in/trn"})
public class INTrnController {
  private final INTrnService inTrnService;

  public INTrnController(INTrnService inTrnService) {
    this.inTrnService = inTrnService;
  }

  // RL In Trn Controller
  @GetMapping("/")
  public ResponseEntity<List<InTrn>> getAllInTrn() {
    return new ResponseEntity<>(inTrnService.getAllInTrn(), HttpStatus.OK);
  }

  @GetMapping("/get-trn")
  public ResponseEntity<InTrn> getInTrn(@Valid @RequestParam("trnNo") Long trnNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(inTrnService.getInTrn(trnNo), HttpStatus.OK);
  }

  @PostMapping("/add")
  public ResponseEntity<InTrn> saveInTrn(@RequestBody InTrn inItem) throws ParseException {
    return new ResponseEntity<>(inTrnService.saveInTrn(inItem), HttpStatus.CREATED);
  }

  @PostMapping("/add-list")
  public ResponseEntity<List<InTrn>> saveInTrnList(@RequestBody List<InTrn> inItemList) {
    return new ResponseEntity<>(inTrnService.saveInTrnList(inItemList), HttpStatus.CREATED);
  }

  @PutMapping("/update")
  public ResponseEntity<InTrn> updateInTrn(@RequestBody InTrn inItem) throws ResourceNotFoundException, ParseException {
    return new ResponseEntity<>(inTrnService.updateInTrn(inItem), HttpStatus.ACCEPTED);
  }

  @DeleteMapping("/delete")
  public ResponseEntity<Map> deleteInTrn(@RequestParam Long trnNo) {
    return new ResponseEntity<>(this.inTrnService.deleteInTrn(trnNo), HttpStatus.OK);
  }

  // Lookup DTL information
  @GetMapping("/trndtl/")
  public ResponseEntity<List<InTrndtl>> getAllTrndtl() {
    return new ResponseEntity<>(this.inTrnService.getAllTrndtl(), HttpStatus.OK);
  }

  @GetMapping("/trndtl/list")
  public ResponseEntity<List<InTrndtl>> getAllTrndtlList(@RequestParam Long trnNo) {
    return new ResponseEntity<>(this.inTrnService.getAllTrndtlList(trnNo), HttpStatus.OK);
  }

  @GetMapping("/trndtl/get-trndtl")
  public ResponseEntity<InTrndtl> getTrndtl(@RequestParam Long trndtlNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(this.inTrnService.getTrndtl(trndtlNo), HttpStatus.OK);
  }

  @PostMapping("/trndtl/add")
  public ResponseEntity<InTrndtl> saveTrndtl(@RequestBody InTrndtl saTrndtl) throws ParseException {
    return new ResponseEntity<>(this.inTrnService.saveTrndtl(saTrndtl), HttpStatus.CREATED);
  }

  @PostMapping("/trndtl/add-list")
  public ResponseEntity<List<InTrndtl>> saveTrndtlList(@RequestBody List<InTrndtl> saTrndtls) {
    return new ResponseEntity<>(this.inTrnService.saveTrndtlList(saTrndtls), HttpStatus.CREATED);
  }

  @PutMapping("/trndtl/update")
  public ResponseEntity<InTrndtl> updateTrndtl(@RequestBody InTrndtl saTrndtl) throws ResourceNotFoundException, ParseException {
    return new ResponseEntity<>(this.inTrnService.updateTrndtl(saTrndtl), HttpStatus.ACCEPTED);
  }

  @PutMapping("/trndtl/update-list")
  public ResponseEntity<List<InTrndtl>> updateTrndtlList(@RequestBody List<InTrndtl> saTrndtls) throws ResourceNotFoundException, ParseException {
    return new ResponseEntity<>(this.inTrnService.updateTrndtlList(saTrndtls), HttpStatus.ACCEPTED);
  }

  @DeleteMapping("/trndtl/delete")
  public ResponseEntity<Map> deleTrndtl(@RequestParam Long trndtlNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(this.inTrnService.deleteTrndtl(trndtlNo), HttpStatus.OK);
  }

  @DeleteMapping("/trndtl/delete-list")
  public ResponseEntity<Map> deleTrndtlList(@RequestBody List<InTrndtl> saTrndtls) throws ResourceNotFoundException {
    return new ResponseEntity<>(this.inTrnService.deleteTrndtlList(saTrndtls), HttpStatus.OK);
  }
}
