package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.InItem;
import com.nahalit.nahalapimanager.service.IN1002Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(value = {"api/rest/in/item"})
public class IN1002Controller {
    private final IN1002Service in1002Service;

    public IN1002Controller(IN1002Service in1002Service) {
        this.in1002Service = in1002Service;
    }

    // RL In Uom Setup Controller
    @GetMapping("/")
    public ResponseEntity<List<InItem>> getAllInItem() {
        return new ResponseEntity<>(in1002Service.getAllInItem(), HttpStatus.OK);
    }

    @GetMapping("/trn-item-list")
    public ResponseEntity<List> getTrnItemList() {
        return new ResponseEntity<>(in1002Service.getTrnItemList(), HttpStatus.OK);
    }

    @GetMapping("/get-item")
    public ResponseEntity<InItem> getInItem(@Valid @RequestParam("itemNo") Long itemNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(in1002Service.getInItem(itemNo), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<InItem> saveInItem(@RequestBody InItem inItem) throws ParseException {
        return new ResponseEntity<>(in1002Service.saveInItem(inItem), HttpStatus.CREATED);
    }

    @PostMapping("/add-list")
    public ResponseEntity<List<InItem>> saveInItemList(@RequestBody List<InItem> inItemList) {
        return new ResponseEntity<>(in1002Service.saveInItemList(inItemList), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<InItem> updateInItem(@RequestBody InItem inItem) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(in1002Service.updateInItem(inItem), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map> deleteInItem(@RequestParam Long itemNo) {

        return new ResponseEntity<>(this.in1002Service.deleteInItem(itemNo), HttpStatus.OK);
    }
}
