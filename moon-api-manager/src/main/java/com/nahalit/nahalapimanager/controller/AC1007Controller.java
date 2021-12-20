package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.AcCostcenter;
import com.nahalit.nahalapimanager.service.AC1007Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(value = {"api/rest/ac/cost"})
public class AC1007Controller {
    private final AC1007Service ac1007Service;

    public AC1007Controller(AC1007Service ac1007Service) {
        this.ac1007Service = ac1007Service;
    }

    // Ac Chart
    @GetMapping("/")
    public ResponseEntity<List<AcCostcenter>> getAllAcCostcenter() {
        return new ResponseEntity<>(ac1007Service.getAllAcCostcenter(), HttpStatus.OK);
    }

    @GetMapping("/get-cost")
    public ResponseEntity<AcCostcenter> getAcCostcenter(@Valid @RequestParam("costNo") Long costNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(ac1007Service.getAcCostcenter(costNo), HttpStatus.OK);
    }

    @GetMapping("get-cost-tree-list")
    public ResponseEntity<List> getCostCenterTree(@Valid @RequestParam(required = false) String costName) {
        return new ResponseEntity<>(this.ac1007Service.getCostCenterTree(costName), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<AcCostcenter> saveAcCostcenter(@RequestBody AcCostcenter acCost) throws ParseException {
        return new ResponseEntity<>(ac1007Service.saveAcCostcenter(acCost), HttpStatus.CREATED);
    }

    @PostMapping("/add-list")
    public ResponseEntity<List<AcCostcenter>> saveAcCostcenterList(@RequestBody List<AcCostcenter> acCostList) {
        return new ResponseEntity<>(ac1007Service.saveAcCostcenterList(acCostList), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<AcCostcenter> updateAcCostcenter(@RequestBody AcCostcenter acCost) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(ac1007Service.updateAcCostcenter(acCost), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map> deleteAcCostcenter(@RequestParam Long costNo) {

        return new ResponseEntity<>(this.ac1007Service.deleteAcCostcenter(costNo), HttpStatus.OK);
    }

}
