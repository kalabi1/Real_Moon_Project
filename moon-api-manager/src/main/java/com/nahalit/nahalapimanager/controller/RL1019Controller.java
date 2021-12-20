package com.nahalit.nahalapimanager.controller;


import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.*;
import com.nahalit.nahalapimanager.service.RL1019Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RequestMapping(value = "/api/rest/rl/trn")
@RestController
public class RL1019Controller {
    private final RL1019Service rl1019Service;

    public RL1019Controller(RL1019Service rl1019Service) {
        this.rl1019Service = rl1019Service;
    }

    @GetMapping("/")
    public ResponseEntity<List> getAllTrn(@RequestParam(required = false) String trnNo, @RequestParam(required = false) String customerNo, @RequestParam(required = false) String itemNo, @RequestParam(required = false) String ssCreartor) throws ResourceNotFoundException {
//    return new ResponseEntity<>(this.rl1019Service.getAllTransaction(trnNo), HttpStatus.OK);
        return new ResponseEntity<>(this.rl1019Service.getAllTrnRef(trnNo, customerNo, itemNo, ssCreartor), HttpStatus.OK);
    }

    @GetMapping("/get-customer-trn")
    public ResponseEntity<List> getAllCustomerTrn(@RequestParam(required = false) String trnNo, @RequestParam String customerNo, @RequestParam(required = false) String itemNo, @RequestParam(required = false) String ssCreartor) throws ResourceNotFoundException {
//    return new ResponseEntity<>(this.rl1019Service.getAllTransaction(trnNo), HttpStatus.OK);
        return new ResponseEntity<>(this.rl1019Service.getAllTrnRef(trnNo, customerNo, itemNo, ssCreartor), HttpStatus.OK);
    }


    @GetMapping("/get-trn")
    public ResponseEntity<Map> getTrnDetails(@RequestParam String trnNo) {
        return new ResponseEntity<>(this.rl1019Service.getTrnDetailsRef(trnNo), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<RlTrn> saveRlTrn(@RequestBody RlTrn rlTrn) throws ParseException, ResourceNotFoundException {
        return new ResponseEntity<>(this.rl1019Service.saveRlTrn(rlTrn), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<RlTrn> updateRlTrn(@RequestBody RlTrn rlTrn) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(this.rl1019Service.updateRlTrn(rlTrn), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map> deleteRlTrn(@RequestParam Long trnNo) {
        return new ResponseEntity<>(this.rl1019Service.deleteRlTrn(trnNo), HttpStatus.OK);
    }

    // RL Item Video Controller
    @GetMapping("/nominee/")
    public ResponseEntity<List<RlTrnNominee>> getAllNominee() {
        return new ResponseEntity<>(this.rl1019Service.getAllNominee(), HttpStatus.OK);
    }

    @GetMapping("/nominee/get-nominee")
    public ResponseEntity<RlTrnNominee> getNomineeByTrnNo(@Valid @RequestParam("trnNo") Long trnNo) {
        return new ResponseEntity<>(this.rl1019Service.getNomineeByTrnNo(trnNo), HttpStatus.OK);
    }

    @PostMapping("/nominee/add")
    public ResponseEntity<RlTrnNominee> saveRlTrnNominee(@RequestBody RlTrnNominee rlTrnNominee) throws ParseException {
        return new ResponseEntity<>(this.rl1019Service.saveRlTrnNominee(rlTrnNominee), HttpStatus.CREATED);
    }

    @PostMapping("/nominee/add-list")
    public ResponseEntity<List<RlTrnNominee>> saveRlTrnNomineeList(@RequestBody List<RlTrnNominee> rlTrnNominees) {
        return new ResponseEntity<>(this.rl1019Service.saveRlTrnNomineeList(rlTrnNominees), HttpStatus.CREATED);
    }

    @PutMapping("/nominee/update")
    public ResponseEntity<RlTrnNominee> updateRlTrnNominee(@RequestBody RlTrnNominee rlTrnNominee) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(this.rl1019Service.updateRlTrnNominee(rlTrnNominee), HttpStatus.ACCEPTED);
    }

    @PutMapping("/nominee/update-list")
    public ResponseEntity<List<RlTrnNominee>> updateRlTrnNomineeList(@RequestBody List<RlTrnNominee> rlTrnNominees) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(this.rl1019Service.updateRlTrnNomineeList(rlTrnNominees), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/nominee/delete")
    public ResponseEntity<Map> deleteRlTrnNominee(@RequestParam Long nomineeNo) throws IOException {
        return new ResponseEntity<>(this.rl1019Service.deleteRlTrnNominee(nomineeNo), HttpStatus.OK);
    }

    @DeleteMapping("/nominee/delete-list")
    public ResponseEntity<Map> deleteRlTrnNomineeList(@RequestBody List<RlTrnNominee> rlTrnNominees) throws IOException, ResourceNotFoundException {
        return new ResponseEntity<>(this.rl1019Service.deleteRlTrnNomineeList(rlTrnNominees), HttpStatus.OK);
    }

    // RL Trn Installment
    @GetMapping("/installment/")
    public ResponseEntity<List<RlTrnInstallment>> getAllRlTrnInstallment() {
        return new ResponseEntity<>(this.rl1019Service.getAllRlTrnInstallment(), HttpStatus.OK);
    }

    @GetMapping("/installment/trn-wise")
    public ResponseEntity<List<RlTrnInstallment>> getAllRlTrnInstallmentTrnWise(@Valid @RequestParam("trnNo") Long trnNo) {
        return new ResponseEntity<>(this.rl1019Service.getAllRlTrnWiseInstallment(trnNo), HttpStatus.OK);
    }

    @GetMapping("/installment/trn-wise-list")
    public ResponseEntity<List> getTrnInstallmentList(@Valid @RequestParam("trnNo") Long trnNo) {
        return new ResponseEntity<>(this.rl1019Service.getTrnInstallmentList(trnNo), HttpStatus.OK);
    }

    @GetMapping("/installment/get-installment")
    public ResponseEntity<RlTrnInstallment> getRlTrnInstallment(@Valid @RequestParam("installmentNo") Long installmentNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(this.rl1019Service.getRlTrnInstallment(installmentNo), HttpStatus.OK);
    }

    @PostMapping("/installment/add")
    public ResponseEntity<RlTrnInstallment> saveRlTrnInstallment(@RequestBody RlTrnInstallment inUom) throws ParseException {
        return new ResponseEntity<>(this.rl1019Service.saveRlTrnInstallment(inUom), HttpStatus.CREATED);
    }

    @PostMapping("/installment/add-list")
    public ResponseEntity<List<RlTrnInstallment>> saveRlTrnInstallmentList(@RequestBody List<RlTrnInstallment> inUomList) {
        return new ResponseEntity<>(this.rl1019Service.saveRlTrnInstallmentList(inUomList), HttpStatus.CREATED);
    }

    @PutMapping("/installment/update")
    public ResponseEntity<RlTrnInstallment> updateRlTrnInstallment(@RequestBody RlTrnInstallment inUom) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(this.rl1019Service.updateRlTrnInstallment(inUom), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/installment/delete")
    public ResponseEntity<Map> deleteRlTrnInstallment(@RequestParam Long installmentNo) {
        return new ResponseEntity<>(this.rl1019Service.deleteRlTrnInstallment(installmentNo), HttpStatus.OK);
    }

    @DeleteMapping("/installment/delete-trn")
    public ResponseEntity<Map> deleteTrnInstallment(@RequestParam Long trnNo) {
        return new ResponseEntity<>(this.rl1019Service.deleteTrnWiseInstallment(trnNo), HttpStatus.OK);
    }

    @GetMapping("/installment/coll-status")
    public ResponseEntity<Map> getTrnInstallmentCollStatus(@RequestParam Long trnNo) {
        return new ResponseEntity<>(this.rl1019Service.getTrnInstallmentCollStatus(trnNo), HttpStatus.OK);
    }
}