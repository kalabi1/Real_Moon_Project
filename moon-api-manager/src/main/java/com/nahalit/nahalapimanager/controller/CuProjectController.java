package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.service.CuProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
@RequestMapping(value = "/api/rest/rl/cu/project")
@RestController
public class CuProjectController {
  private final CuProjectService cuProjectService;

  public CuProjectController(CuProjectService cuProjectService) {
    this.cuProjectService = cuProjectService;
  }
@GetMapping("/")
  public ResponseEntity<List> getProjectList(
      @RequestParam(required = false) String projectNo,
      @RequestParam(required = false) String projectTypeNo,
      @RequestParam(required = false) String projectType,
      @RequestParam(required = false) String projectStatus,
      @RequestParam(required = false) String regionNo,
      @RequestParam(required = false) String subregionNo,
      @RequestParam(required = false) String publicFlag
      ) {
    return new ResponseEntity<>(this.cuProjectService.getProjectList(projectNo, projectTypeNo,projectType,projectStatus,regionNo,subregionNo,publicFlag), HttpStatus.OK);
  }
  @GetMapping("/details")
  public ResponseEntity<Map> getProjectDetails(
      @RequestParam(required = false) String projectNo) {
    return new ResponseEntity<>(this.cuProjectService.getProjectDetails(projectNo), HttpStatus.OK);
  }
}
