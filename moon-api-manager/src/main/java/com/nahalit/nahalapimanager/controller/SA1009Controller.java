package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.SaRegion;
import com.nahalit.nahalapimanager.model.SaSubregion;
import com.nahalit.nahalapimanager.service.SA1009Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RequestMapping(value = "api/rest/sa/setting")
@Controller
public class SA1009Controller {
    private final SA1009Service sa1009Service;

    public SA1009Controller(SA1009Service sa1009Service) {
        this.sa1009Service = sa1009Service;
    }

    // Region Information
    @GetMapping("/region/")
    public ResponseEntity<List<SaRegion>> getAllRegion() {
        return new ResponseEntity<>(this.sa1009Service.getAllRegion(), HttpStatus.OK);
    }

    @GetMapping("/region/get-region")
    public ResponseEntity<SaRegion> getRegion(@RequestParam Long regionNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(this.sa1009Service.getRegion(regionNo), HttpStatus.OK);
    }

    @PostMapping("/region/add")
    public ResponseEntity<SaRegion> saveRegion(@RequestBody SaRegion saRegion) throws ParseException {
        return new ResponseEntity<>(this.sa1009Service.saveRegion(saRegion), HttpStatus.CREATED);
    }

    @PostMapping("/region/add-list")
    public ResponseEntity<List<SaRegion>> saveRegionList(@RequestBody List<SaRegion> saRegions) throws ParseException {
        return new ResponseEntity<>(this.sa1009Service.saveRegionList(saRegions), HttpStatus.CREATED);
    }

    @PutMapping("/region/update")
    public ResponseEntity<SaRegion> updateRegion(@RequestBody SaRegion saRegion) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(this.sa1009Service.updateRegion(saRegion), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/region/delete")
    public ResponseEntity<Map> deleRegion(@RequestParam Long regionNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(this.sa1009Service.deleteRegion(regionNo), HttpStatus.OK);
    }

    // Region DTL information
    @GetMapping("/subregion/")
    public ResponseEntity<List<SaSubregion>> getAllSaSubregion() {
        return new ResponseEntity<>(this.sa1009Service.getAllSubregion(), HttpStatus.OK);
    }


    @GetMapping("/subregion/list")
    public ResponseEntity<List<SaSubregion>> getAllSaSubregionList(@RequestParam Long regionNo) {
        return new ResponseEntity<>(this.sa1009Service.getAllSubregionList(regionNo), HttpStatus.OK);
    }

    @GetMapping("/subregion/get-Subregion")
    public ResponseEntity<SaSubregion> getSubregion(@RequestParam Long SubregionNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(this.sa1009Service.getSubregion(SubregionNo), HttpStatus.OK);
    }

    @PostMapping("/subregion/add")
    public ResponseEntity<SaSubregion> saveSubregion(@RequestBody SaSubregion saSaSubregion) throws ParseException {
        return new ResponseEntity<>(this.sa1009Service.saveSubregion(saSaSubregion), HttpStatus.CREATED);
    }

    @PostMapping("/subregion/add-list")
    public ResponseEntity<List<SaSubregion>> saveSaSubregionList(@RequestBody List<SaSubregion> saSaSubregions) {
        return new ResponseEntity<>(this.sa1009Service.saveSubregionList(saSaSubregions), HttpStatus.CREATED);
    }

    @PutMapping("/subregion/update")
    public ResponseEntity<SaSubregion> updateSubregion(@RequestBody SaSubregion saSaSubregion) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(this.sa1009Service.updateSubregion(saSaSubregion), HttpStatus.ACCEPTED);
    }

    @PutMapping("/subregion/update-list")
    public ResponseEntity<List<SaSubregion>> updateSubregionList(@RequestBody List<SaSubregion> saSaSubregions) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(this.sa1009Service.updateSubregionList(saSaSubregions), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/subregion/delete")
    public ResponseEntity<Map> deleSubregion(@RequestParam Long subregionNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(this.sa1009Service.deleteSubregion(subregionNo), HttpStatus.OK);
    }

    @DeleteMapping("/subregion/delete-list")
    public ResponseEntity<Map> deleteSubregionList(@RequestBody List<SaSubregion> saSaSubregions) throws ResourceNotFoundException {
        return new ResponseEntity<>(this.sa1009Service.deleteSubregionList(saSaSubregions), HttpStatus.OK);
    }
}
