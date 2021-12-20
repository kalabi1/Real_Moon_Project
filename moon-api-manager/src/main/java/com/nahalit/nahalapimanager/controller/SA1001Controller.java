package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.model.SaCompany;
import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.SaCompanySlider;
import com.nahalit.nahalapimanager.service.SA1001Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RequestMapping(value = "api/rest/sa/company")
@RestController
public class SA1001Controller {
    private final SA1001Service sa1001Service;

    public SA1001Controller(SA1001Service sa1001Service) {
        this.sa1001Service = sa1001Service;
    }

    @GetMapping("/")
    public ResponseEntity<List> getAllSaCompany() {
        return new ResponseEntity<>(this.sa1001Service.getSaCompanyList(), HttpStatus.OK);
    }

    @GetMapping("/get-company")
    public ResponseEntity<SaCompany> getSaCompany(@Valid @RequestParam("companyNo") Long companyNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(sa1001Service.getSaCompany(companyNo), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<SaCompany> saveSaCompany(@RequestBody SaCompany saCompany) throws ParseException {
        return new ResponseEntity<>(this.sa1001Service.saveSaCompany(saCompany), HttpStatus.CREATED);
    }


    @PutMapping("/update")
    public ResponseEntity<SaCompany> updateSaCompany(@RequestBody SaCompany saCompany) throws ResourceNotFoundException, ParseException, IOException {
        return new ResponseEntity<>(this.sa1001Service.updateSaCompany(saCompany), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map> deleteSaCompany(@RequestParam Long companyNo) throws IOException {
        return new ResponseEntity<>(this.sa1001Service.deleteSaCompany(companyNo), HttpStatus.OK);
    }

    @PostMapping("/slider/add")
    public ResponseEntity<SaCompanySlider> saveCompanySlider(SaCompanySlider saCompanySlider, MultipartFile multipartFile) throws ParseException {
        return new ResponseEntity<>(this.sa1001Service.saveCompanySlider(saCompanySlider, multipartFile), HttpStatus.CREATED);
    }

    @GetMapping("/slider/")
    public ResponseEntity<List<SaCompanySlider>> getAllCompanySlider() {
        return new ResponseEntity<>(this.sa1001Service.getAllSlider(), HttpStatus.OK);
    }

    @GetMapping("/slider/get-company-wise")
    public ResponseEntity<List<SaCompanySlider>> getCompanySlider(Long companyNo) {
        return new ResponseEntity<>(this.sa1001Service.getCompanySlider(companyNo), HttpStatus.OK);
    }

    @DeleteMapping("/slider/delete")
    public ResponseEntity<Map> deleteCompanySlider(@RequestParam Long sliderNo) throws IOException {
        return new ResponseEntity<>(this.sa1001Service.deleteCompanySlider(sliderNo), HttpStatus.OK);
    }

    // Get Spell Out number
    @GetMapping("/spellout")
    public ResponseEntity<Map> getSpellout(Double value) {
        return new ResponseEntity<>(this.sa1001Service.getSpellout(value), HttpStatus.OK);
    }
}
