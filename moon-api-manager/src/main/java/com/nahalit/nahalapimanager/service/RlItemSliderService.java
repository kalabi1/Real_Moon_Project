package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.RlItemSlider;
import com.nahalit.nahalapimanager.repository.RlItemSliderRepository;
import com.nahalit.nahalapimanager.storage.StorageService;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.RejectedExecutionException;

@Service
public class RlItemSliderService {
  private final RlItemSliderRepository rlItemSliderRepository;
  private final StorageService storageService;

  public RlItemSliderService(RlItemSliderRepository rlItemSliderRepository, StorageService storageService) {
    this.rlItemSliderRepository = rlItemSliderRepository;
    this.storageService = storageService;
  }

  // RL Item Slider Service
  public List<RlItemSlider> getAllRlItemSlider() {
    return this.rlItemSliderRepository.findAll();
  }

  public RlItemSlider getRlItemSlider(Long sliderNo) throws ResourceNotFoundException {
    return this.rlItemSliderRepository.findById(sliderNo).orElseThrow(() -> new ResourceNotFoundException("Item Slider not found for this id:" + sliderNo));
  }

  public List<RlItemSlider> getRlItemSliderList(Long itemNo) {
    return this.rlItemSliderRepository.findAllByItemNo(itemNo);
  }

  public RlItemSlider saveRlItemSlider(RlItemSlider reRlItemSlider) throws ParseException {
    reRlItemSlider.setSsCreatedOn(UtillDate.getDateTime());
    reRlItemSlider.setSsModifiedOn(null);
    return this.rlItemSliderRepository.save(reRlItemSlider);
  }

  public Map deleteRlItemSlider(Long sliderNo) throws IOException {
    RlItemSlider rlItemSlider=  this.rlItemSliderRepository.findById(sliderNo).orElseThrow(() -> new RejectedExecutionException("Item Slider not found for this id: " + sliderNo));
   try {
     storageService.deleteFile(rlItemSlider.getImageName());
   }catch (Exception e){}
    this.rlItemSliderRepository.deleteById(sliderNo);
    Map<String, String> deleteMessage = new HashMap<>();
    deleteMessage.put("deleteStatus", "Deleted Successfully");
    return deleteMessage;
  }
}
