package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.AcVouchertype;
import com.nahalit.nahalapimanager.service.AC1001Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(value = {"api/rest/ac/configuration"})
public class AC1001Controller {
    private final AC1001Service ac1001Service;

    public AC1001Controller(AC1001Service ac1001Service) {
        this.ac1001Service = ac1001Service;
    }

    // Ac Voucher Type Controller
    @GetMapping("/vtype/")
    public ResponseEntity<List<AcVouchertype>> getAllVtype() {
        return new ResponseEntity<>(ac1001Service.getAllAcVouchertype(), HttpStatus.OK);
    }

    @GetMapping("/vtype/get-vtype")
    public ResponseEntity<AcVouchertype> getAcVouchertype(@Valid @RequestParam("vtypeNo") Long vtypeNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(ac1001Service.getAcVouchertype(vtypeNo), HttpStatus.OK);
    }

    @PostMapping("/vtype/add")
    public ResponseEntity<AcVouchertype> saveAcVouchertype(@RequestBody AcVouchertype inUom) throws ParseException {
        return new ResponseEntity<>(ac1001Service.saveAcVouchertype(inUom), HttpStatus.CREATED);
    }

    @PostMapping("/vtype/add-list")
    public ResponseEntity<List<AcVouchertype>> saveAcVouchertypeList(@RequestBody List<AcVouchertype> inUomList) {
        return new ResponseEntity<>(ac1001Service.saveAcVouchertypeList(inUomList), HttpStatus.CREATED);
    }

    @PutMapping("/vtype/update")
    public ResponseEntity<AcVouchertype> updateAcVouchertype(@RequestBody AcVouchertype inUom) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(ac1001Service.updateAcVouchertype(inUom), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/vtype/delete")
    public ResponseEntity<Map> deleteAcVouchertype(@RequestParam Long vtypeNo) {

        return new ResponseEntity<>(this.ac1001Service.deleteAcVouchertype(vtypeNo), HttpStatus.OK);
    }

}
