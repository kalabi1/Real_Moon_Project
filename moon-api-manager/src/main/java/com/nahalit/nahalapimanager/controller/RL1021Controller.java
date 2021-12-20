package com.nahalit.nahalapimanager.controller;


import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.RlCollection;
import com.nahalit.nahalapimanager.service.RL1021Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RequestMapping(value = "/api/rest/rl/trn/collection")
@RestController
public class RL1021Controller {

    private final RL1021Service rl1021Service;

    public RL1021Controller(RL1021Service rl1021Service) {
        this.rl1021Service = rl1021Service;
    }

    @GetMapping("/get-trn-balance")
    public ResponseEntity<List> getAllTrnBalance() {
        return new ResponseEntity<>(this.rl1021Service.getTrnBalanceList(), HttpStatus.OK);
    }

    // RL Collection
    @GetMapping("/")
    public ResponseEntity<List<RlCollection>> getAllCollection() {
        return new ResponseEntity<>(rl1021Service.getAllRlCollection(), HttpStatus.OK);
    }

    @GetMapping("/get-collection")
    public ResponseEntity<RlCollection> getRlCollection(@Valid @RequestParam("collNo") Long collNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(rl1021Service.getRlCollection(collNo), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<RlCollection> saveRlCollection(@RequestBody RlCollection rlCollection) throws ParseException {
        return new ResponseEntity<>(rl1021Service.saveRlCollection(rlCollection), HttpStatus.CREATED);
    }

//    @PostMapping("/collection/add-list")
//    public ResponseEntity<List<RlCollection>> saveRlCollectionList(@RequestBody List<RlCollection> rlCollectionList) {
//        return new ResponseEntity<>(rl1021Service.saveRlCollectionList(rlCollectionList), HttpStatus.CREATED);
//    }

    @PutMapping("/update")
    public ResponseEntity<RlCollection> updateRlCollection(@RequestBody RlCollection rlCollection) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(rl1021Service.updateRlCollection(rlCollection), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map> deleteRlCollection(@RequestParam Long collNo) {

        return new ResponseEntity<>(this.rl1021Service.deleteRlCollection(collNo), HttpStatus.OK);
    }
}