package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.SaRegion;
import com.nahalit.nahalapimanager.model.SaSubregion;
import com.nahalit.nahalapimanager.repository.SaRegionRepository;
import com.nahalit.nahalapimanager.repository.SaSubregionRepository;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SA1009Service {
  private final SaRegionRepository saRegionRepository;
  private final SaSubregionRepository saSubregionRepository;

  public SA1009Service(SaRegionRepository saRegionRepository, SaSubregionRepository saSubregionRepository) {
    this.saRegionRepository = saRegionRepository;
    this.saSubregionRepository = saSubregionRepository;
  }

  // SA Region Information
  public List<SaRegion> getAllRegion() {
    return saRegionRepository.findAll();
  }

  public SaRegion getRegion(Long regionNo) throws ResourceNotFoundException {
    return saRegionRepository.findById(regionNo).orElseThrow(() -> new ResourceNotFoundException("Transaction Not found for this id: " + regionNo));
  }

  public SaRegion saveRegion(SaRegion saRegion) throws ParseException {
    saRegion.setSsCreatedOn(UtillDate.getDateTime());
    saRegion.setSsModifiedOn(null);
    return saRegionRepository.save(saRegion);
  }

  public List<SaRegion> saveRegionList(List<SaRegion> saRegions) {
    List<SaRegion> saRegionList = new ArrayList<>();
    saRegions.forEach(saRegion -> {
      try {
        saRegion.setSsCreatedOn(UtillDate.getDateTime());
        saRegion.setSsModifiedOn(null);
        saRegionList.add(this.saRegionRepository.save(saRegion));
      } catch (ParseException e) {
      }
    });
    return saRegionList;
  }

  public SaRegion updateRegion(SaRegion saRegion) throws ResourceNotFoundException, ParseException {
    SaRegion oldData = this.saRegionRepository.findById(saRegion.getRegionNo()).orElseThrow(() -> new ResourceNotFoundException("Region not found for this id: " + saRegion.getRegionNo()));
    saRegion.setSsCreatedOn(oldData.getSsCreatedOn());
    saRegion.setSsModifiedOn(UtillDate.getDateTime());
    return saRegionRepository.save(saRegion);
  }

  public Map deleteRegion(Long regionNo) throws ResourceNotFoundException {
    this.saRegionRepository.findById(regionNo).orElseThrow(() -> new ResourceNotFoundException("Region not found for this id: " + regionNo));
    this.saRegionRepository.deleteById((regionNo));
    Map<String, String> deleteMessage = new HashMap<>();
    deleteMessage.put("deleteStatus", "Deleted Successfully");
    return deleteMessage;
  }

  // SA Region DTL Information
  public List<SaSubregion> getAllSubregion() {
    return saSubregionRepository.findAll();
  }

  public List<SaSubregion> getAllSubregionList(Long regionNo) {
    return saSubregionRepository.findAllByRegionNo(regionNo);
  }

  public SaSubregion getSubregion(Long regionNo) throws ResourceNotFoundException {
    return saSubregionRepository.findById(regionNo).orElseThrow(() -> new ResourceNotFoundException("Lopokup Not found for this id: " + regionNo));
  }


  public SaSubregion saveSubregion(SaSubregion saSubregion) throws ParseException {
    saSubregion.setSsCreatedOn(UtillDate.getDateTime());
    saSubregion.setSsModifiedOn(null);
    return saSubregionRepository.save(saSubregion);
  }

  public List<SaSubregion> saveSubregionList(List<SaSubregion> saSubregions) {
    List<SaSubregion> saSubregionList = new ArrayList<>();
    saSubregions.forEach(saSubregion -> {
      try {
        saSubregion.setSsCreatedOn(UtillDate.getDateTime());
        saSubregion.setSsModifiedOn(null);
        saSubregionList.add(this.saSubregionRepository.save(saSubregion));
      } catch (ParseException e) {
      }
    });
    return saSubregionList;
  }

  public SaSubregion updateSubregion(SaSubregion saSubregion) throws ResourceNotFoundException, ParseException {
    SaSubregion oldData = this.saSubregionRepository.findById(saSubregion.getRegionNo()).orElseThrow(() -> new ResourceNotFoundException("Subregion not found for this id: " + saSubregion.getSubregionNo()));
    saSubregion.setSsCreatedOn(oldData.getSsCreatedOn());
    saSubregion.setSsModifiedOn(UtillDate.getDateTime());
    return this.saSubregionRepository.save(saSubregion);
  }

  public List<SaSubregion> updateSubregionList(List<SaSubregion> saSubregions) throws ResourceNotFoundException, ParseException {
    List<SaSubregion> saveData = new ArrayList<>();
    for (SaSubregion saSubregion : saSubregions) {
      SaSubregion oldData = this.saSubregionRepository.findById(saSubregion.getRegionNo()).orElseThrow(() -> new ResourceNotFoundException("Subregion not found for this id: " + saSubregion.getSubregionNo()));
      saSubregion.setSsCreatedOn(oldData.getSsCreatedOn());
      saSubregion.setSsModifiedOn(UtillDate.getDateTime());
      saveData.add(saSubregionRepository.save(saSubregion));
    }
    return saveData;
  }

  public Map deleteSubregion(Long subregionNo) throws ResourceNotFoundException {
    this.saSubregionRepository.findById(subregionNo).orElseThrow(() -> new ResourceNotFoundException("Subregion not found for this id: " + subregionNo));
    this.saSubregionRepository.deleteById(subregionNo);
    Map<String, String> deleteMessage = new HashMap<>();
    deleteMessage.put("deleteStatus", "Deleted Successfully");
    return deleteMessage;
  }

  public Map deleteSubregionList(List<SaSubregion> saSubregions) throws ResourceNotFoundException {
    for (SaSubregion saSubregion : saSubregions) {
      this.saSubregionRepository.findById(saSubregion.getSubregionNo()).orElseThrow(() -> new ResourceNotFoundException("Subregion not found for this id: " + saSubregion.getSubregionNo()));
      this.saSubregionRepository.deleteById(saSubregion.getSubregionNo());
    }
    Map<String, String> deleteMessage = new HashMap<>();
    deleteMessage.put("deleteStatus", "Deleted Successfully");
    return deleteMessage;
  }
}
