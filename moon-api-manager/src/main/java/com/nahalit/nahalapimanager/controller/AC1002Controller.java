package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.AcBank;
import com.nahalit.nahalapimanager.service.AC1002Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(value = {"api/rest/ac/bank"})
public class AC1002Controller {
    private final AC1002Service ac1002Service;

    public AC1002Controller(AC1002Service ac1002Service) {
        this.ac1002Service = ac1002Service;
    }

    // Ac Bank
    @GetMapping("/")
    public ResponseEntity<List<AcBank>> getAllAcBank() {
        return new ResponseEntity<>(ac1002Service.getAllAcBank(), HttpStatus.OK);
    }

    @GetMapping("/get-bank")
    public ResponseEntity<AcBank> getAcBank(@Valid @RequestParam("bankNo") Long bankNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(ac1002Service.getAcBank(bankNo), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<AcBank> saveAcBank(@RequestBody AcBank acBank) throws ParseException {
        return new ResponseEntity<>(ac1002Service.saveAcBank(acBank), HttpStatus.CREATED);
    }

    @PostMapping("/add-list")
    public ResponseEntity<List<AcBank>> saveAcBankList(@RequestBody List<AcBank> acBankList) {
        return new ResponseEntity<>(ac1002Service.saveAcBankList(acBankList), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<AcBank> updateAcBank(@RequestBody AcBank acBank) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(ac1002Service.updateAcBank(acBank), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map> deleteAcBank(@RequestParam Long bankNo) {

        return new ResponseEntity<>(this.ac1002Service.deleteAcBank(bankNo), HttpStatus.OK);
    }

}
