package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.model.RlProject;
import com.nahalit.nahalapimanager.service.RL1004Service;
import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RequestMapping(value = "api/rest/rl/project/land")
@RestController
public class RL1004Controller {
  private final RL1004Service rl1004Service;

  public RL1004Controller(RL1004Service rl1004Service) {
    this.rl1004Service = rl1004Service;
  }

  @GetMapping("/")
  public ResponseEntity<List> getAllLandProject(@Valid @RequestParam(value = "projectNo", required = false) Long projectNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(rl1004Service.getAllProject(projectNo), HttpStatus.OK);
  }

  @GetMapping("/get-project")
  public ResponseEntity<Object> getLandProject(@Valid @RequestParam("projectNo") Long projectNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(rl1004Service.getProject(projectNo), HttpStatus.OK);
  }

  @PostMapping("/add")
  public ResponseEntity<RlProject> saveLandProject(@RequestBody RlProject rlProject) throws ParseException {
    return new ResponseEntity<>(rl1004Service.saveRlProject(rlProject), HttpStatus.CREATED);
  }


  @PutMapping("/update")
  public ResponseEntity<RlProject> updateLandProject(@RequestBody RlProject rlProject) throws ResourceNotFoundException, ParseException, IOException {
    return new ResponseEntity<>(rl1004Service.updateRlProject(rlProject), HttpStatus.ACCEPTED);
  }

  @DeleteMapping("/delete")
  public ResponseEntity<Map> deleteLandProject(@RequestParam Long projectNo) throws IOException {
    return new ResponseEntity<>(this.rl1004Service.deleteRlProject(projectNo), HttpStatus.OK);
  }
}
