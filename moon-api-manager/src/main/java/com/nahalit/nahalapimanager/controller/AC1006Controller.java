package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.AcChart;
import com.nahalit.nahalapimanager.service.AC1006Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(value = {"api/rest/ac/chart"})
public class AC1006Controller {
    private final AC1006Service ac1006Service;

    public AC1006Controller(AC1006Service ac1006Service) {
        this.ac1006Service = ac1006Service;
    }


    // Ac Chart List
    @PostMapping("/acc-tree-list")
    public ResponseEntity<List> getAccTreeList() {
        return new ResponseEntity<>(ac1006Service.getAccTreeList(), HttpStatus.OK);
    }

    // Ac Chart
    @GetMapping("/")
    public ResponseEntity<List<AcChart>> getAllAcChart() {
        return new ResponseEntity<>(ac1006Service.getAllAcChart(), HttpStatus.OK);
    }

    @GetMapping("/get-chart")
    public ResponseEntity<AcChart> getAcChart(@Valid @RequestParam("accNo") Long accNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(ac1006Service.getAcChart(accNo), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<AcChart> saveAcChart(@RequestBody AcChart acChart) throws ParseException {
        return new ResponseEntity<>(ac1006Service.saveAcChart(acChart), HttpStatus.CREATED);
    }

    @PostMapping("/add-list")
    public ResponseEntity<List<AcChart>> saveAcChartList(@RequestBody List<AcChart> acChartList) {
        return new ResponseEntity<>(ac1006Service.saveAcChartList(acChartList), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<AcChart> updateAcChart(@RequestBody AcChart acChart) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(ac1006Service.updateAcChart(acChart), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map> deleteAcChart(@RequestParam Long accNo) {

        return new ResponseEntity<>(this.ac1006Service.deleteAcChart(accNo), HttpStatus.OK);
    }

}
