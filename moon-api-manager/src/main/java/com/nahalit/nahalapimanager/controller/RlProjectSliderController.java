package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.RlProjectSlider;
import com.nahalit.nahalapimanager.service.RlProjectSliderService;
import com.nahalit.nahalapimanager.storage.StorageService;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RequestMapping(value = "api/rest/rl/project/slider")
@RestController
public class RlProjectSliderController {
  private final RlProjectSliderService rlProjectSliderService;
  private final StorageService storageService;

  public RlProjectSliderController(RlProjectSliderService rlProjectSliderService, StorageService storageService) {
    this.rlProjectSliderService = rlProjectSliderService;
    this.storageService = storageService;
  }


  // RL Item Slider Controller
  @GetMapping("/")
  public ResponseEntity<List<RlProjectSlider>> getAllRlProjectSlider() {
    return new ResponseEntity<>(this.rlProjectSliderService.getAllRlProjectSlider(), HttpStatus.OK);
  }

  @GetMapping("/get-project-slider")
  public ResponseEntity<RlProjectSlider> getProjectSlider(@Valid @RequestParam("sliderNo") Long sliderNo) throws ResourceNotFoundException {
    return new ResponseEntity<>(this.rlProjectSliderService.getRlProjectSlider(sliderNo), HttpStatus.OK);
  }

  @GetMapping("/get-project-slider-list")
  public ResponseEntity<List<RlProjectSlider>> getAllRlProjectSliderList(@Valid @RequestParam Long projectNo) {
    return new ResponseEntity<>(this.rlProjectSliderService.getRlProjectSliderList(projectNo), HttpStatus.OK);
  }

  @PostMapping("/add")
  public ResponseEntity<RlProjectSlider> saveProjectSlider(@RequestParam MultipartFile multipartFile, RlProjectSlider rlItemSlider) throws ParseException {
    if (multipartFile != null) {
      String nowTime = UtillDate.getNowTimeNameForImage();
      String filename = StringUtils.cleanPath(multipartFile.getOriginalFilename()).replaceAll("(?i)(.+?)(\\.\\w+$)", nowTime + "$2");
      storageService.store(multipartFile, filename);
      rlItemSlider.setImageName(filename);
    }
    return new ResponseEntity<>(this.rlProjectSliderService.saveRlProjectSlider(rlItemSlider), HttpStatus.CREATED);
  }

  @DeleteMapping("/delete")
  public ResponseEntity<Map> deleteProjectSlider(@RequestParam Long sliderNo) throws IOException {
    return new ResponseEntity<>(this.rlProjectSliderService.deleteRlProjectSlider(sliderNo), HttpStatus.OK);
  }
}
