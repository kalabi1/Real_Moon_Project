package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.AcVoucher;
import com.nahalit.nahalapimanager.model.AcVoucherdtl;
import com.nahalit.nahalapimanager.service.AC1008Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(value = {"api/rest/ac/voucher"})
public class AC1008Controller {
  private final AC1008Service ac1008Service;

  public AC1008Controller(AC1008Service ac1008Service) {
    this.ac1008Service = ac1008Service;
  }

  // Ac Voucher
  @GetMapping("/")
  public ResponseEntity<List<AcVoucher>> getAllAcVoucher() {
    return new ResponseEntity<>(ac1008Service.getAllAcVoucher(), HttpStatus.OK);
  }

  @GetMapping("/ref-list")
  public ResponseEntity<List<AcVoucher>> getAllAcVoucherRefList() {
    return new ResponseEntity<>(this.ac1008Service.getAllAcVoucherRefList(), HttpStatus.OK);
  }

  @GetMapping("/get-voucher")
  public ResponseEntity<AcVoucher> getAcVoucher(@Valid @RequestParam("vNo") Long vNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(ac1008Service.getAcVoucher(vNo), HttpStatus.OK);
  }

  @PostMapping("/add")
  public ResponseEntity<AcVoucher> saveAcVoucher(@RequestBody AcVoucher acVoucher) throws ParseException {
    return new ResponseEntity<>(ac1008Service.saveAcVoucher(acVoucher), HttpStatus.CREATED);
  }

  @PostMapping("/add-list")
  public ResponseEntity<List<AcVoucher>> saveAcVoucherList(@RequestBody List<AcVoucher> acVoucherList) {
    return new ResponseEntity<>(ac1008Service.saveAcVoucherList(acVoucherList), HttpStatus.CREATED);
  }

  @PutMapping("/update")
  public ResponseEntity<AcVoucher> updateAcVoucher(@RequestBody AcVoucher acVoucher) throws ResourceNotFoundException, ParseException {
    return new ResponseEntity<>(ac1008Service.updateAcVoucher(acVoucher), HttpStatus.ACCEPTED);
  }

  @DeleteMapping("/delete")
  public ResponseEntity<Map> deleteAcVoucher(@RequestParam Long vNo) {

    return new ResponseEntity<>(this.ac1008Service.deleteAcVoucher(vNo), HttpStatus.OK);
  }

  // AC Voucher DTL
  @GetMapping("/voucherdtl/")
  public ResponseEntity<List<AcVoucherdtl>> getAllAcVoucherdtl() {
    return new ResponseEntity<>(this.ac1008Service.getAllAcVoucherdtl(), HttpStatus.OK);
  }


  @GetMapping("/voucherdtl/list")
  public ResponseEntity<List<AcVoucherdtl>> getAllAcVoucherdtlList(@RequestParam Long vNo) {
    return new ResponseEntity<>(this.ac1008Service.getAllAcVoucherdtlList(vNo), HttpStatus.OK);
  }

  @GetMapping("/voucherdtl/list-ref")
  public ResponseEntity<List> getAcVoucherdtlRefList(@RequestParam Long vNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(this.ac1008Service.getAcVoucherdtlRefList(vNo), HttpStatus.OK);
  }


  @GetMapping("/voucherdtl/get-voucherdtl")
  public ResponseEntity<AcVoucherdtl> getAcVoucherdtl(@RequestParam Long vdtlNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(this.ac1008Service.getAcVoucherdtl(vdtlNo), HttpStatus.OK);
  }


  @PostMapping("/voucherdtl/add")
  public ResponseEntity<AcVoucherdtl> saveAcVoucherdtl(@RequestBody AcVoucherdtl acVoucherdtl) throws ParseException {
    return new ResponseEntity<>(this.ac1008Service.saveAcVoucherdtl(acVoucherdtl), HttpStatus.CREATED);
  }

  @PostMapping("/voucherdtl/add-list")
  public ResponseEntity<List<AcVoucherdtl>> saveAcVoucherdtlList(@RequestBody List<AcVoucherdtl> acVoucherdtls) {
    return new ResponseEntity<>(this.ac1008Service.saveAcVoucherdtlList(acVoucherdtls), HttpStatus.CREATED);
  }

  @PutMapping("/voucherdtl/update")
  public ResponseEntity<AcVoucherdtl> updateAcVoucherdtl(@RequestBody AcVoucherdtl acVoucherdtl) throws ResourceNotFoundException, ParseException {
    return new ResponseEntity<>(this.ac1008Service.updateAcVoucherdtl(acVoucherdtl), HttpStatus.ACCEPTED);
  }

  @PutMapping("/voucherdtl/update-list")
  public ResponseEntity<List<AcVoucherdtl>> updateAcVoucherdtlList(@RequestBody List<AcVoucherdtl> acVoucherdtls) throws ResourceNotFoundException, ParseException {
    return new ResponseEntity<>(this.ac1008Service.updateAcVoucherdtlList(acVoucherdtls), HttpStatus.ACCEPTED);
  }

  @DeleteMapping("/voucherdtl/delete")
  public ResponseEntity<Map> deleAcVoucherdtl(@RequestParam Long vdtlNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(this.ac1008Service.deleteAcVoucherdtl(vdtlNo), HttpStatus.OK);
  }

  @DeleteMapping("/voucherdtl/delete-list")
  public ResponseEntity<Map> deleteAcVoucherdtlList(@RequestParam Long vNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(this.ac1008Service.deleteAcVoucherdtlList(vNo), HttpStatus.OK);
  }
}
