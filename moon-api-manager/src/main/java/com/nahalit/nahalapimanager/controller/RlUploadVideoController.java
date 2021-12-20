package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.model.RlUploadVideo;
import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.service.RlUploadVideoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RequestMapping(value = "api/rest/rl/video")
@RestController
public class RlUploadVideoController {
    private final RlUploadVideoService rlItemVideoService;

    public RlUploadVideoController(RlUploadVideoService rlItemVideoService) {
        this.rlItemVideoService = rlItemVideoService;
    }

    // RL Item Video Controller
    @GetMapping("/")
    public ResponseEntity<List<RlUploadVideo>> getAllRlItemVideo() {
        return new ResponseEntity<>(this.rlItemVideoService.getAllRlItemVideo(), HttpStatus.OK);
    }

    @GetMapping("/get-video")
    public ResponseEntity<RlUploadVideo> getItemVideo(@Valid @RequestParam("videoNo") Long videoNo) throws ResourceNotFoundException {
        return new ResponseEntity<>(this.rlItemVideoService.getRlItemVideo(videoNo), HttpStatus.OK);
    }

    @GetMapping("/get-item-video-list")
    public ResponseEntity<List<RlUploadVideo>> getAllRlItemVideoList(@Valid @RequestParam("itemNo") Long itemNo) {
        return new ResponseEntity<>(this.rlItemVideoService.getRlItemVideoList(itemNo), HttpStatus.OK);
    }
    @GetMapping("/get-project-video-list")
    public ResponseEntity<List<RlUploadVideo>> getAllRlProjectVideoList(@Valid @RequestParam Long projectNo) {
        return new ResponseEntity<>(this.rlItemVideoService.getRlProjectVideoList(projectNo), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<RlUploadVideo> saveItemVideo(@RequestBody RlUploadVideo reItemVideo) throws ParseException {
        return new ResponseEntity<>(this.rlItemVideoService.saveRlItemVideo(reItemVideo), HttpStatus.CREATED);
    }

    @PostMapping("/add-list")
    public ResponseEntity<List<RlUploadVideo>> saveItemVideoList(@RequestBody List<RlUploadVideo> rlItemVideos) {
        return new ResponseEntity<>(this.rlItemVideoService.saveRlItemVideoList(rlItemVideos), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<RlUploadVideo> updateItemVideo(@RequestBody RlUploadVideo reItemVideo) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(this.rlItemVideoService.updateRlItemVideo(reItemVideo), HttpStatus.ACCEPTED);
    }

    @PutMapping("/update-list")
    public ResponseEntity<List<RlUploadVideo>> updateItemVideoList(@RequestBody List<RlUploadVideo> reItemVideos) throws ResourceNotFoundException, ParseException {
        return new ResponseEntity<>(this.rlItemVideoService.updateRlItemVideoList(reItemVideos), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map> deleteVideo(@RequestParam Long videoNo) {
        return new ResponseEntity<>(this.rlItemVideoService.deleteRlItemVideo(videoNo), HttpStatus.OK);
    }

    @DeleteMapping("/delete-list")
    public ResponseEntity<Map> deleteVideoList(@RequestBody List<RlUploadVideo> reItemVideos) {

        return new ResponseEntity<>(this.rlItemVideoService.deleteRlItemVideoList(reItemVideos), HttpStatus.OK);
    }
}
