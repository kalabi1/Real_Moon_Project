package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.model.RlItemSize;
import com.nahalit.nahalapimanager.model.RlProject;
import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.service.RL1003Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RequestMapping(value = "api/rest/rl/project/ap")
@RestController
public class RL1003Controller {
  private final RL1003Service rl1003Service;

  public RL1003Controller(RL1003Service rl1003Service) {
    this.rl1003Service = rl1003Service;
  }

  @GetMapping("/")
  public ResponseEntity<List> getAllApProject(@RequestParam(value = "projectNo", required = false) Long projectNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(rl1003Service.getAllProject(projectNo), HttpStatus.OK);
  }

  @GetMapping("/get-project")
  public ResponseEntity<Object> getApProject(@Valid @RequestParam(value = "projectNo") Long projectNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(rl1003Service.getProject(projectNo), HttpStatus.OK);
  }

  @PostMapping("/add")
  public ResponseEntity<RlProject> saveApProject(@RequestBody RlProject rlProject) throws ParseException {
    return new ResponseEntity<>(rl1003Service.saveRlProject(rlProject), HttpStatus.CREATED);
  }


  @PutMapping("/update")
  public ResponseEntity<RlProject> updateApProject(@RequestBody RlProject rlProject) throws ResourceNotFoundException, ParseException, IOException {
    return new ResponseEntity<>(rl1003Service.updateRlProject(rlProject), HttpStatus.ACCEPTED);
  }

  @DeleteMapping("/delete")
  public ResponseEntity<Map> deleteApProject(@RequestParam Long projectNo) throws IOException {
    return new ResponseEntity<>(this.rl1003Service.deleteRlProject(projectNo), HttpStatus.OK);
  }

  // Flat Type Wise Size setup
  @GetMapping("/size/")
  public ResponseEntity<List<RlItemSize>> getAllItemSize() {
    return new ResponseEntity<>(this.rl1003Service.getAllItemSize(), HttpStatus.OK);
  }

  @GetMapping("/size/get-item-size")
  public ResponseEntity<RlItemSize> getItemSize(@RequestParam Long sizeNo) {
    return new ResponseEntity<>(this.rl1003Service.getItemSize(sizeNo), HttpStatus.OK);
  }

  @GetMapping("/size/get-item-size-list")
  public ResponseEntity<List<RlItemSize>> getItemSizeList(@RequestParam Long projectNo) {
    return new ResponseEntity<>(this.rl1003Service.getAllItemSizeList(projectNo), HttpStatus.OK);
  }

  @PostMapping("/size/add")
  public ResponseEntity<RlItemSize> saveItemSize(@RequestBody RlItemSize rlItemSize) throws ParseException {
    return new ResponseEntity<>(this.rl1003Service.saveItemSize(rlItemSize), HttpStatus.CREATED);
  }

  @PostMapping("/size/add-list")
  public ResponseEntity<List<RlItemSize>> saveItemSizeList(@RequestBody List<RlItemSize> rlItemSizes) {
    return new ResponseEntity<>(this.rl1003Service.saveItemSizeList(rlItemSizes), HttpStatus.CREATED);
  }

  @PutMapping("/size/update")
  public ResponseEntity<RlItemSize> updateItemSize(@RequestBody RlItemSize rlItemSize) throws ParseException {
    return new ResponseEntity<>(this.rl1003Service.updateItemSize(rlItemSize), HttpStatus.ACCEPTED);
  }

  @PutMapping("/size/update-list")
  public ResponseEntity<List<RlItemSize>> updateItemSizeList(@RequestBody List<RlItemSize> rlItemSizes) throws ParseException {
    return new ResponseEntity<>(this.rl1003Service.updateItemSizeList(rlItemSizes), HttpStatus.ACCEPTED);
  }

  @DeleteMapping("/size/delete")
  public ResponseEntity<Map> deleteItemSize(@RequestParam Long sizeNo) {
    return new ResponseEntity<>(this.rl1003Service.deleteItemSize(sizeNo), HttpStatus.OK);
  }

  @DeleteMapping("/size/delete-list")
  public ResponseEntity<Map> deleteItemSizeList(@RequestBody List<RlItemSize> rlItemSizes) {
    return new ResponseEntity<>(this.rl1003Service.deleteItemSizeList(rlItemSizes), HttpStatus.OK);
  }
}
