package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.AcPeriod;
import com.nahalit.nahalapimanager.service.AC1003Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(value = {"api/rest/ac/period"})
public class AC1003Controller {
    private final AC1003Service ac1003Service;

    public AC1003Controller(AC1003Service ac1003Service) {
        this.ac1003Service = ac1003Service;
    }


    // Ac Period
    @GetMapping("/")
    public ResponseEntity<List<AcPeriod>> getAllPeriod() {
        return new ResponseEntity<>(ac1003Service.getAllAcPeriod(), HttpStatus.OK);
    }

    @GetMapping("/get-period")
    public ResponseEntity<AcPeriod> getAcPeriod(@Valid @RequestParam("periodNo") Long periodNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(ac1003Service.getAcPeriod(periodNo), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<AcPeriod> saveAcPeriod(@RequestBody AcPeriod acPeriod) throws ParseException {
        return new ResponseEntity<>(ac1003Service.saveAcPeriod(acPeriod), HttpStatus.CREATED);
    }

    @PostMapping("/add-list")
    public ResponseEntity<List<AcPeriod>> saveAcPeriodList(@RequestBody List<AcPeriod> acPeriodList) {
        return new ResponseEntity<>(ac1003Service.saveAcPeriodList(acPeriodList), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<AcPeriod> updateAcPeriod(@RequestBody AcPeriod acPeriod) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(ac1003Service.updateAcPeriod(acPeriod), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map> deleteAcPeriod(@RequestParam Long periodNo) {

        return new ResponseEntity<>(this.ac1003Service.deleteAcPeriod(periodNo), HttpStatus.OK);
    }

}
