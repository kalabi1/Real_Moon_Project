package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.SaMessage;
import com.nahalit.nahalapimanager.service.SA1011Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;


@RequestMapping(value = {"api/rest/sa/message"})
@RestController
public class SA1011Controller {
    private final SA1011Service sa1011Service;

    public SA1011Controller(SA1011Service sa1011Service) {
        this.sa1011Service = sa1011Service;
    }

    // Sa Gallery
    @GetMapping("/")
    public ResponseEntity<List<SaMessage>> getAllSaMessage() {
        return new ResponseEntity<>(sa1011Service.getAllSaMessage(), HttpStatus.OK);
    }

    @GetMapping("/get-message")
    public ResponseEntity<SaMessage> getSaMessage(@Valid @RequestParam("messageNo") Long messageNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(sa1011Service.getSaMessage(messageNo), HttpStatus.OK);
    }
    @GetMapping("/get-message-by-messenger")
    public ResponseEntity<SaMessage> getSaMessageByType(@Valid @RequestParam("messengerType") String messengerType) throws ResourceNotFoundException {
        return new ResponseEntity<>(sa1011Service.getSaMessageByType(messengerType), HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity<SaMessage> saveSaMessage(@RequestBody SaMessage saGallery) throws ParseException {
        return new ResponseEntity<>(sa1011Service.saveSaMessage(saGallery), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<SaMessage> updateSaMessage(@RequestBody SaMessage saGallery) throws ResourceNotFoundException, ParseException, IOException {
        return new ResponseEntity<>(sa1011Service.updateSaMessage(saGallery), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map> deleteSaMessage(@RequestParam Long messageNo) throws ResourceNotFoundException, IOException {
        return new ResponseEntity<>(this.sa1011Service.deleteSaMessage(messageNo), HttpStatus.OK);
    }
}
