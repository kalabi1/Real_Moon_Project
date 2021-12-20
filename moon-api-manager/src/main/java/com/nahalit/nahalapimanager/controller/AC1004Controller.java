package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.AcNature;
import com.nahalit.nahalapimanager.service.AC1004Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(value = {"api/rest/ac/nature"})
public class AC1004Controller {
    private final AC1004Service ac1004Service;

    public AC1004Controller(AC1004Service ac1004Service) {
        this.ac1004Service = ac1004Service;
    }


    // Ac Nature
    @GetMapping("/")
    public ResponseEntity<List<AcNature>> getAllAcNature() {
        return new ResponseEntity<>(ac1004Service.getAllAcNature(), HttpStatus.OK);
    }

    @GetMapping("/get-nature")
    public ResponseEntity<AcNature> getAcNature(@Valid @RequestParam("natureNo") Long natureNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(ac1004Service.getAcNature(natureNo), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<AcNature> saveAcNature(@RequestBody AcNature acNature) throws ParseException {
        return new ResponseEntity<>(ac1004Service.saveAcNature(acNature), HttpStatus.CREATED);
    }

    @PostMapping("/add-list")
    public ResponseEntity<List<AcNature>> saveAcNatureList(@RequestBody List<AcNature> acNatureList) {
        return new ResponseEntity<>(ac1004Service.saveAcNatureList(acNatureList), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<AcNature> updateAcNature(@RequestBody AcNature acNature) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(ac1004Service.updateAcNature(acNature), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map> deleteAcNature(@RequestParam Long natureNo) {

        return new ResponseEntity<>(this.ac1004Service.deleteAcNature(natureNo), HttpStatus.OK);
    }

}
