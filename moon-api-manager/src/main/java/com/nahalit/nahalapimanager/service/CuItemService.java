package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.dao.RLItemDao;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CuItemService {
  private final RLItemDao rLItemDao;

  public CuItemService(RLItemDao rLItemDao) {
    this.rLItemDao = rLItemDao;
  }


  public List getItemList(String itemNo, String itemTypeNo, String itemName, String bedRoom, String priceFrom, String priceTo, String sizeFrom, String sizeTo, String projectLocation, String itemNoList, String projectNo, String itemInventoryFlag,String projectType,String projectStatus,String projectRegion) {
    return this.rLItemDao.getItemList(itemNo, itemTypeNo, itemName, bedRoom, priceFrom, priceTo, sizeFrom, sizeTo, projectLocation, itemNoList, projectNo, itemInventoryFlag,projectType,projectStatus,projectRegion);
  }

  public Map getItemDetails(String itemNo) {
    return this.rLItemDao.getItemDetails(itemNo);
  }
}
