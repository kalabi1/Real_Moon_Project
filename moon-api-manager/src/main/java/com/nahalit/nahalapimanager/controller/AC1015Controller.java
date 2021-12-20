package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.AcBa;
import com.nahalit.nahalapimanager.service.AC1015Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(value = {"api/rest/ac/ba"})
public class AC1015Controller {
    private final AC1015Service ac1015Service;

    public AC1015Controller(AC1015Service ac1015Service) {
        this.ac1015Service = ac1015Service;
    }


    // Ac Chart
    @GetMapping("/")
    public ResponseEntity<List<AcBa>> getAllAcBa() {
        return new ResponseEntity<>(ac1015Service.getAllAcBa(), HttpStatus.OK);
    }

    @GetMapping("/get-ba")
    public ResponseEntity<AcBa> getAcBa(@Valid @RequestParam("baNo") Long baNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(ac1015Service.getAcBa(baNo), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<AcBa> saveAcBa(@RequestBody AcBa acCost) throws ParseException {
        return new ResponseEntity<>(ac1015Service.saveAcBa(acCost), HttpStatus.CREATED);
    }

    @PostMapping("/add-list")
    public ResponseEntity<List<AcBa>> saveAcBaList(@RequestBody List<AcBa> acCostList) {
        return new ResponseEntity<>(ac1015Service.saveAcBaList(acCostList), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<AcBa> updateAcBa(@RequestBody AcBa acCost) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(ac1015Service.updateAcBa(acCost), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map> deleteAcBa(@RequestParam Long baNo) {

        return new ResponseEntity<>(this.ac1015Service.deleteAcBa(baNo), HttpStatus.OK);
    }

}
