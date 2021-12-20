package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.SaGallery;
import com.nahalit.nahalapimanager.service.SA1010Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;


@RequestMapping(value = {"api/rest/sa/gallery"})
@RestController
public class SA1010Controller {
    private final SA1010Service sa1010Service;

    public SA1010Controller(SA1010Service sa1010Service) {
        this.sa1010Service = sa1010Service;
    }

    // Sa Gallery
    @GetMapping("/")
    public ResponseEntity<List<SaGallery>> getAllSaGallery() {
        return new ResponseEntity<>(sa1010Service.getAllSaGallery(), HttpStatus.OK);
    }

    @GetMapping("/get-gallery")
    public ResponseEntity<SaGallery> getSaGallery(@Valid @RequestParam("galleryNo") Long galleryNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(sa1010Service.getSaGallery(galleryNo), HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity<SaGallery> saveSaGallery(@RequestBody SaGallery saGallery) throws ParseException {
        return new ResponseEntity<>(sa1010Service.saveSaGallery(saGallery), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<SaGallery> updateSaGallery(@RequestBody SaGallery saGallery) throws ResourceNotFoundException, ParseException, IOException {
        return new ResponseEntity<>(sa1010Service.updateSaGallery(saGallery), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map> deleteSaGallery(@RequestParam Long galleryNo) throws ResourceNotFoundException, IOException {
        return new ResponseEntity<>(this.sa1010Service.deleteSaGallery(galleryNo), HttpStatus.OK);
    }

}
