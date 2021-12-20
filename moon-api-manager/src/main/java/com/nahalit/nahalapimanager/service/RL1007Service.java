package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.dao.RLItemDao;
import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.repository.RlItemRepository;
import com.nahalit.nahalapimanager.storage.StorageService;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import com.nahalit.nahalapimanager.model.RlItem;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.RejectedExecutionException;

@Service
public class RL1007Service {
  private final RlItemRepository rlItemRepository;
  private final StorageService storageService;
  private final RL1007Dao rl1007Dao;
  private final RLItemDao rlItemDao;

  public RL1007Service(RlItemRepository rlItemRepository, StorageService storageService, RL1007Dao rl1007Dao, RLItemDao rlItemDao) {
    this.rlItemRepository = rlItemRepository;
    this.storageService = storageService;
    this.rl1007Dao = rl1007Dao;
    this.rlItemDao = rlItemDao;
  }

  // RL Item For Land
  public List getAllLandItem(String itemNo,String projectNo) throws ResourceNotFoundException {
//    return this.rlItemRepository.findAllByItemType(1L);
    if (itemNo != null) {
      this.rlItemRepository.findById(Long.parseLong(itemNo)).orElseThrow(() -> new ResourceNotFoundException("Plot item not found for this id:" + itemNo));
    }
    return this.rlItemDao.getAllItemRef(itemNo, "1", projectNo);
  }

  public Object getLandItem(String itemNo) {
//    return this.rlItemRepository.findItemByIdAndType(itemNo, 1L);
    return this.rlItemDao.getItemDetails(itemNo);
  }


  public RlItem saveLandRlItem(RlItem rlItem) throws ParseException {
    rlItem.setSsCreatedOn(UtillDate.getDateTime());
    rlItem.setSsModifiedOn(null);
    rlItem.setItemTypeNo(1L);
    rlItem.setItemId(rlItemDao.getItemId(rlItem.getProjectNo()));
    return this.rlItemRepository.save(rlItem);
  }

  public RlItem updateLandRlItem(RlItem rlItem) throws ResourceNotFoundException, ParseException, IOException {
    RlItem oldData = this.rlItemRepository.findById(rlItem.getItemNo()).orElseThrow(() -> new ResourceNotFoundException("Land Item not for this:" + rlItem.getItemNo()));
    if (oldData.getItemBrandPhoto() != null && rlItem.getItemBrandPhoto() != null && !oldData.getItemBrandPhoto().equalsIgnoreCase(rlItem.getItemBrandPhoto())) {
      this.storageService.deleteFile(oldData.getItemBrandPhoto());
    }
    rlItem.setSsCreatedOn(oldData.getSsCreatedOn());
    rlItem.setSsModifiedOn(UtillDate.getDateTime());
    return this.rlItemRepository.save(rlItem);
  }

  public Map deleteLandRlItem(Long itemNo) throws IOException {
    RlItem rlItem = this.rlItemRepository.findById(itemNo).orElseThrow(() -> new RejectedExecutionException("Land Item not found for this id: " + itemNo));
    this.rlItemRepository.deleteById(itemNo);
    if (rlItem.getItemBrandPhoto() != null) {
      this.storageService.deleteFile(rlItem.getItemBrandPhoto());
    }
    Map<String, String> deleteMessage = new HashMap<>();
    deleteMessage.put("deleteStatus", "Deleted Successfully");
    return deleteMessage;
  }

  public List getFeatureProperty(Long itemNo) throws ResourceNotFoundException {
    if (itemNo != null) {
      this.rlItemRepository.findById(itemNo).orElseThrow(() -> new ResourceNotFoundException("Land item not found for this id:" + itemNo));
    }
    return this.rlItemDao.getFeatureProperty(itemNo);
  }
}
