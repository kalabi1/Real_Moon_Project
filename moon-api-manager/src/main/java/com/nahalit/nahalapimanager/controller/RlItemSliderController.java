package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.RlItemSlider;
import com.nahalit.nahalapimanager.service.RlItemSliderService;
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

@RequestMapping(value = "api/rest/rl/item/slider")
@RestController
public class RlItemSliderController {
    private final RlItemSliderService rlItemSliderService;
    private final StorageService storageService;

    public RlItemSliderController(RlItemSliderService rlItemSliderService, StorageService storageService) {
        this.rlItemSliderService = rlItemSliderService;
        this.storageService = storageService;
    }

    // RL Item Slider Controller
    @GetMapping("/")
    public ResponseEntity<List<RlItemSlider>> getAllRlItemSlider() {
        return new ResponseEntity<>(this.rlItemSliderService.getAllRlItemSlider(), HttpStatus.OK);
    }

    @GetMapping("/get-item-Slider")
    public ResponseEntity<RlItemSlider> getItemSlider(@Valid @RequestParam("sliderNo") Long sliderNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(this.rlItemSliderService.getRlItemSlider(sliderNo), HttpStatus.OK);
    }

    @GetMapping("/get-item-Slider-list")
    public ResponseEntity<List<RlItemSlider>> getAllRlItemSliderList(@Valid @RequestParam Long itemNo) {
        return new ResponseEntity<>(this.rlItemSliderService.getRlItemSliderList(itemNo), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<RlItemSlider> saveItemSlider(@RequestParam MultipartFile multipartFile, RlItemSlider rlItemSlider) throws ParseException {
        if (multipartFile != null) {
            String nowTime = UtillDate.getNowTimeNameForImage();
            String filename = StringUtils.cleanPath(multipartFile.getOriginalFilename()).replaceAll("(?i)(.+?)(\\.\\w+$)", nowTime + "$2");
            storageService.store(multipartFile, filename);
            rlItemSlider.setImageName(filename);
        }
        return new ResponseEntity<>(this.rlItemSliderService.saveRlItemSlider(rlItemSlider), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map> deleteSlider(@RequestParam Long sliderNo) throws IOException {
        return new ResponseEntity<>(this.rlItemSliderService.deleteRlItemSlider(sliderNo), HttpStatus.OK);
    }
}
