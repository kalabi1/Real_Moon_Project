package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.*;
import com.nahalit.nahalapimanager.service.RL1001Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;
import java.util.Map;


@RequestMapping(value = {"api/rest/rl/configuration"})
@RestController
public class RL1001Controller {
    private final RL1001Service rl1001Service;

    public RL1001Controller(RL1001Service rl1001Service) {
        this.rl1001Service = rl1001Service;
    }

    // RL Config Setup
    @GetMapping("/get-config")
    public ResponseEntity<RlConfig> getRlConfig() throws ResourceNotFoundException {
        return new ResponseEntity<>(this.rl1001Service.getRlConfig(), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<RlConfig> saveRlConfig(@RequestBody RlConfig rlConfig) {
        return new ResponseEntity<>(this.rl1001Service.saveRlConfig(rlConfig), HttpStatus.CREATED);
    }

    // RL Facing Setup Controller
    @GetMapping("/facing/")
    public ResponseEntity<List<RlFacing>> getAllfacing() {
        return new ResponseEntity<>(rl1001Service.getAllFacing(), HttpStatus.OK);
    }

    @GetMapping("/facing/get-item-category")
    public ResponseEntity<RlFacing> getFacing(@Valid @RequestParam("facingNo") Long facingNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(rl1001Service.getFacing(facingNo), HttpStatus.OK);
    }

    @PostMapping("/facing/add")
    public ResponseEntity<RlFacing> saveFacing(@RequestBody RlFacing rlFacing) throws ParseException {
        return new ResponseEntity<>(rl1001Service.saveFacing(rlFacing), HttpStatus.CREATED);
    }

    @PostMapping("/facing/add-list")
    public ResponseEntity<List<RlFacing>> saveFacingList(@RequestBody List<RlFacing> rlFacingList) {
        return new ResponseEntity<>(rl1001Service.saveFacingList(rlFacingList), HttpStatus.CREATED);
    }

    @PutMapping("/facing/update")
    public ResponseEntity<RlFacing> updateFacing(@RequestBody RlFacing rlFacing) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(rl1001Service.updateFacing(rlFacing), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/facing/delete")
    public ResponseEntity<Map> deleteFacing(@RequestParam Long facingNo) {

        return new ResponseEntity<>(this.rl1001Service.deleteFacing(facingNo), HttpStatus.OK);
    }

    // RL Road Size Setup Controller
    @GetMapping("/road-size/")
    public ResponseEntity<List<RlRoadSize>> getAllRlRoadSize() {
        return new ResponseEntity<>(rl1001Service.getAllRlRoadSize(), HttpStatus.OK);
    }


    @PostMapping("/road-size/add")
    public ResponseEntity<RlRoadSize> saveRlRoadSize(@RequestBody RlRoadSize rlRoadSize) throws ParseException {
        return new ResponseEntity<>(rl1001Service.saveRlRoadSize(rlRoadSize), HttpStatus.CREATED);
    }

    @PostMapping("/road-size/add-list")
    public ResponseEntity<List<RlRoadSize>> saveRlRoadSizeList(@RequestBody List<RlRoadSize> rlRoadSizeList) {
        return new ResponseEntity<>(rl1001Service.saveRlRoadSizeList(rlRoadSizeList), HttpStatus.CREATED);
    }

    @PutMapping("/road-size/update")
    public ResponseEntity<RlRoadSize> updateRlRoadSize(@RequestBody RlRoadSize rlRoadSize) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(rl1001Service.updateRlRoadSize(rlRoadSize), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/road-size/delete")
    public ResponseEntity<Map> deleteRlRoadSize(@RequestParam Long sizeNo) {
        return new ResponseEntity<>(this.rl1001Service.deleteRlRoadSize(sizeNo), HttpStatus.OK);
    }

    // RL Plot Position Setup Controller
    @GetMapping("/position/")
    public ResponseEntity<List<RlPlotPosition>> getAllPoltPosition() {
        return new ResponseEntity<>(rl1001Service.getAllPoltPosition(), HttpStatus.OK);
    }

    @GetMapping("/position/get-item-category")
    public ResponseEntity<RlPlotPosition> getPoltPosition(@Valid @RequestParam("positionNo") Long positionNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(rl1001Service.getPoltPosition(positionNo), HttpStatus.OK);
    }

    @PostMapping("/position/add")
    public ResponseEntity<RlPlotPosition> savePoltPosition(@RequestBody RlPlotPosition rlPlotPosition) throws ParseException {
        return new ResponseEntity<>(rl1001Service.savePoltPosition(rlPlotPosition), HttpStatus.CREATED);
    }

    @PostMapping("/position/add-list")
    public ResponseEntity<List<RlPlotPosition>> savePoltPositionList(@RequestBody List<RlPlotPosition> rlPlotPositionList) {
        return new ResponseEntity<>(rl1001Service.savePoltPositionList(rlPlotPositionList), HttpStatus.CREATED);
    }

    @PutMapping("/position/update")
    public ResponseEntity<RlPlotPosition> updatePoltPosition(@RequestBody RlPlotPosition rlPlotPosition) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(rl1001Service.updatePoltPosition(rlPlotPosition), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/position/delete")
    public ResponseEntity<Map> deletePoltPosition(@RequestParam Long positionNo) {

        return new ResponseEntity<>(this.rl1001Service.deletePoltPosition(positionNo), HttpStatus.OK);
    }

}
