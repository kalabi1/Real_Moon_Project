package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.RlPropertyContact;
import com.nahalit.nahalapimanager.service.RL1018Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RequestMapping(value = "api/rest/rl/property-contact/")
@RestController
public class RL1018Controller {
    private final RL1018Service rl1018Service;

    public RL1018Controller(RL1018Service rl1018Service) {
        this.rl1018Service = rl1018Service;
    }

    // RL Item Contact Controller
    @GetMapping("/")
    public ResponseEntity<List<RlPropertyContact>> getAllRlPropertyContact() {
        return new ResponseEntity<>(this.rl1018Service.getAllRlContact(), HttpStatus.OK);
    }

    @GetMapping("/get-contact")
    public ResponseEntity<RlPropertyContact> getContact(@Valid @RequestParam("contactNo") Long contactNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(this.rl1018Service.getRlContact(contactNo), HttpStatus.OK);
    }


    @PostMapping("/add")
    public ResponseEntity<RlPropertyContact> saveContact(@RequestBody RlPropertyContact reItemContact) throws ParseException {
        return new ResponseEntity<>(this.rl1018Service.saveRlContact(reItemContact), HttpStatus.CREATED);
    }


    @PutMapping("/update")
    public ResponseEntity<RlPropertyContact> updateContact(@RequestBody RlPropertyContact reItemContact) {
        return new ResponseEntity<>(this.rl1018Service.updateRlContact(reItemContact), HttpStatus.ACCEPTED);
    }

    @PutMapping("/update/read-status")
    public ResponseEntity<Map> updateReadContact(@RequestBody RlPropertyContact reItemContact) {
        return new ResponseEntity<>(this.rl1018Service.updateReadStatus(reItemContact.getContactNo()), HttpStatus.ACCEPTED);
    }

    @PutMapping("/update/unread-status")
    public ResponseEntity<Map> updateUnReadContact(@RequestBody RlPropertyContact reItemContact) {
        return new ResponseEntity<>(this.rl1018Service.updateUnReadStatus(reItemContact.getContactNo()), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map> deleteContact(@RequestParam Long contactNo) {

        return new ResponseEntity<>(this.rl1018Service.deleteRlContact(contactNo), HttpStatus.OK);
    }

}
