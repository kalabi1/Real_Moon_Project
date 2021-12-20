package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.model.RlRajukApproval;
import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.service.RL1012Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RequestMapping(value = "api/rest/rl/rajuk-approval")
@RestController
public class RL1012Controller {

  private final RL1012Service rl1012Service;

  public RL1012Controller(RL1012Service rl1012Service) {
    this.rl1012Service = rl1012Service;
  }

  // RL Rajuk Approval Controller
  @GetMapping("/")
  public ResponseEntity<List<RlRajukApproval>> getAllRajukApproval() {
    return new ResponseEntity<>(rl1012Service.getAllRajukApproval(), HttpStatus.OK);
  }

  @GetMapping("/get-rajuk-approval")
  public ResponseEntity<RlRajukApproval> getRajukApproval(@Valid @RequestParam("approvalNo") Long approvalNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(rl1012Service.getRajukApproval(approvalNo), HttpStatus.OK);
  }

  @PostMapping("/add")
  public ResponseEntity<RlRajukApproval> saveRajukApproval(@RequestBody RlRajukApproval rlRajukApproval) throws ParseException {
    return new ResponseEntity<>(rl1012Service.saveRajukApproval(rlRajukApproval), HttpStatus.CREATED);
  }

  @PutMapping("/update")
  public ResponseEntity<RlRajukApproval> updateRajukApproval(@RequestBody RlRajukApproval rlRajukApproval) throws ResourceNotFoundException, ParseException {
    return new ResponseEntity<>(rl1012Service.updateRajukApproval(rlRajukApproval), HttpStatus.ACCEPTED);
  }

  @DeleteMapping("/delete")
  public ResponseEntity<Map> deleteRajukApproval(@RequestParam Long approvalNo) {
    return new ResponseEntity<>(this.rl1012Service.deleteRajukApproval(approvalNo), HttpStatus.OK);
  }

}
