package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.RlItemInstallment;
import com.nahalit.nahalapimanager.service.RlItemInstallmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RequestMapping(value = "api/rest/rl/item/installment")
@RestController
public class RlItemInstallmentController {


  private final RlItemInstallmentService rlItemInstallmentService;

  @Autowired
  public RlItemInstallmentController(RlItemInstallmentService rlItemInstallmentService) {
    this.rlItemInstallmentService = rlItemInstallmentService;
  }

  // RL Item Installment Controller
  @GetMapping("/")
  public ResponseEntity<List<RlItemInstallment>> getAllInstallment() {
    return new ResponseEntity<>(rlItemInstallmentService.getAllRlItemInstallment(), HttpStatus.OK);
  }

  @GetMapping("/get-item-installment")
  public ResponseEntity<RlItemInstallment> getItemInstallment(@Valid @RequestParam("installmentNo") Long installmentNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(rlItemInstallmentService.getRlItemInstallment(installmentNo), HttpStatus.OK);
  }

  @GetMapping("get-item-installment-list")
  public ResponseEntity<List<RlItemInstallment>> getItemInstallmentList(@Valid @RequestParam Long itemNo) {
    return new ResponseEntity<>(rlItemInstallmentService.getRlItemInstallmentList(itemNo), HttpStatus.OK);
  }

  @PostMapping("/add")
  public ResponseEntity<RlItemInstallment> saveItemInstallment(@RequestBody RlItemInstallment reItemInstallment) throws ParseException {
    return new ResponseEntity<>(rlItemInstallmentService.saveRlItemInstallment(reItemInstallment), HttpStatus.CREATED);
  }

  @PostMapping("/add-list")
  public ResponseEntity<List<RlItemInstallment>> saveItemInstallmentList(@RequestBody List<RlItemInstallment> rlItemInstallments) {
    return new ResponseEntity<>(this.rlItemInstallmentService.saveRlItemInstallmentList(rlItemInstallments), HttpStatus.CREATED);
  }

  @PutMapping("/update")
  public ResponseEntity<RlItemInstallment> updateItemInstallment(@RequestBody RlItemInstallment reItemInstallment) throws ResourceNotFoundException, ParseException {
    return new ResponseEntity<>(rlItemInstallmentService.updateRlItemInstallment(reItemInstallment), HttpStatus.ACCEPTED);
  }

  @PutMapping("/update-list")
  public ResponseEntity<List<RlItemInstallment>> updateItemInstallmentList(@RequestBody List<RlItemInstallment> reItemInstallments) throws ResourceNotFoundException, ParseException {
    return new ResponseEntity<>(rlItemInstallmentService.updateRlItemInstallmentList(reItemInstallments), HttpStatus.ACCEPTED);
  }

  @DeleteMapping("/delete")
  public ResponseEntity<Map> deleteInstallment(@RequestParam Long installmentNo) {
    return new ResponseEntity<>(this.rlItemInstallmentService.deleteRlItemInstallment(installmentNo), HttpStatus.OK);
  }

  @DeleteMapping("/delete-list")
  public ResponseEntity<Map> deleteInstallmentList(@RequestBody List<RlItemInstallment> rlItemInstallments) {
    return new ResponseEntity<>(this.rlItemInstallmentService.deleteRlItemInstallmentList(rlItemInstallments), HttpStatus.OK);
  }
}
