package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.RlUploadVideo;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import com.nahalit.nahalapimanager.repository.RlUploadVideoRepository;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.RejectedExecutionException;

@Service
public class RlUploadVideoService {
  private final RlUploadVideoRepository rlItemVideoRepository;

  public RlUploadVideoService(RlUploadVideoRepository rlItemVideoRepository) {
    this.rlItemVideoRepository = rlItemVideoRepository;
  }

  // RL Item Video Service
  public List<RlUploadVideo> getAllRlItemVideo() {
    return this.rlItemVideoRepository.findAll();
  }

  public RlUploadVideo getRlItemVideo(Long videoNo) throws ResourceNotFoundException {
    return this.rlItemVideoRepository.findById(videoNo).orElseThrow(() -> new ResourceNotFoundException("Item Video not found for this id:" + videoNo));
  }

  public List<RlUploadVideo> getRlItemVideoList(Long itemNO) {
    return this.rlItemVideoRepository.findAllByItemNo(itemNO);
  }

  public List<RlUploadVideo> getRlProjectVideoList(Long projectNo) {
    return this.rlItemVideoRepository.findAllByProjectNo(projectNo);
  }

  public RlUploadVideo saveRlItemVideo(RlUploadVideo rlItemVideo) throws ParseException {
    rlItemVideo.setSsCreatedOn(UtillDate.getDateTime());
    rlItemVideo.setSsModifiedOn(null);
    return this.rlItemVideoRepository.save(rlItemVideo);
  }

  public List<RlUploadVideo> saveRlItemVideoList(List<RlUploadVideo> rlItemVideos) {
    List<RlUploadVideo> rlItemVideoList = new ArrayList<>();
    rlItemVideos.forEach(rlItemVideo -> {
      try {
        rlItemVideo.setSsCreatedOn(UtillDate.getDateTime());
        rlItemVideo.setSsModifiedOn(null);
        rlItemVideoList.add(this.rlItemVideoRepository.save(rlItemVideo));
      } catch (ParseException e) {
      }
    });
    return rlItemVideoList;
  }

  public RlUploadVideo updateRlItemVideo(RlUploadVideo reRlItemVideo) throws ResourceNotFoundException, ParseException {
    RlUploadVideo oldData = this.rlItemVideoRepository.findById(reRlItemVideo.getVideoNo()).orElseThrow(() -> new ResourceNotFoundException("Item Video not for this:" + reRlItemVideo.getVideoNo()));
    reRlItemVideo.setSsCreatedOn(oldData.getSsCreatedOn());
    reRlItemVideo.setSsModifiedOn(UtillDate.getDateTime());
    return this.rlItemVideoRepository.save(reRlItemVideo);
  }

  public List<RlUploadVideo> updateRlItemVideoList(List<RlUploadVideo> reRlItemVideos) throws ResourceNotFoundException, ParseException {
    List<RlUploadVideo> saveList = new ArrayList<>();
    for (RlUploadVideo reRlItemVideo : reRlItemVideos) {
      RlUploadVideo oldData = this.rlItemVideoRepository.findById(reRlItemVideo.getVideoNo()).orElseThrow(() -> new ResourceNotFoundException("Item Video not for this:" + reRlItemVideo.getVideoNo()));
      reRlItemVideo.setSsCreatedOn(oldData.getSsCreatedOn());
      reRlItemVideo.setSsModifiedOn(UtillDate.getDateTime());
      saveList.add(this.rlItemVideoRepository.save(reRlItemVideo));
    }
    return saveList;
  }

  public Map deleteRlItemVideo(Long videoNo) {
    this.rlItemVideoRepository.findById(videoNo).orElseThrow(() -> new RejectedExecutionException("Item Video not found for this id: " + videoNo));
    this.rlItemVideoRepository.deleteById(videoNo);
    Map<String, String> deleteMessage = new HashMap<>();
    deleteMessage.put("deleteStatus", "Deleted Successfully");
    return deleteMessage;
  }

  public Map deleteRlItemVideoList(List<RlUploadVideo> reRlItemVideos) {
    for (RlUploadVideo rlItemVideo : reRlItemVideos) {
      this.rlItemVideoRepository.findById(rlItemVideo.getVideoNo()).orElseThrow(() -> new RejectedExecutionException("Item Video not found for this id: " + rlItemVideo.getVideoNo()));
      this.rlItemVideoRepository.deleteById(rlItemVideo.getVideoNo());
    }
    Map<String, String> deleteMessage = new HashMap<>();
    deleteMessage.put("deleteStatus", "Deleted Successfully");
    return deleteMessage;
  }
}
