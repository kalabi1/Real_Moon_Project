package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.InTrn;
import com.nahalit.nahalapimanager.model.InTrndtl;
import com.nahalit.nahalapimanager.repository.InTrnRepository;
import com.nahalit.nahalapimanager.repository.InTrndtlRepository;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.RejectedExecutionException;

@Service
public class INTrnService {
  private final InTrnRepository inTrnRepository;
  private final InTrndtlRepository inTrndtlRepository;
  private final AuthService authService;

  public INTrnService(InTrnRepository inTrnRepository, InTrndtlRepository inTrndtlRepository, AuthService authService) {
    this.inTrnRepository = inTrnRepository;
    this.inTrndtlRepository = inTrndtlRepository;
    this.authService = authService;
  }

  // In Transaction
  public List<InTrn> getAllInTrn() {
    return this.inTrnRepository.findAll();
  }

  public InTrn getInTrn(Long trnNo) throws ResourceNotFoundException {
    return this.inTrnRepository.findById(trnNo).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id:" + trnNo));
  }

  public InTrn saveInTrn(InTrn inTrn) throws ParseException {
    inTrn.setSsCreatedOn(UtillDate.getDateTime());
    inTrn.setSsModifiedOn(null);
    inTrn.setSsCreator(authService.getUserNo());
    return this.inTrnRepository.save(inTrn);
  }

  public List<InTrn> saveInTrnList(List<InTrn> inTrnList) {
    return this.inTrnRepository.saveAll(inTrnList);
  }

  public InTrn updateInTrn(InTrn inTrn) throws ResourceNotFoundException, ParseException {
    InTrn oldData = this.inTrnRepository.findById(inTrn.getTrnNo()).orElseThrow(() -> new ResourceNotFoundException("Transaction not for this:" + inTrn.getTrnNo()));
    inTrn.setSsModifiedOn(UtillDate.getDateTime());
    inTrn.setSsCreatedOn(oldData.getSsCreatedOn());
    inTrn.setSsModifier(authService.getUserNo());
    inTrn.setSsCreator(oldData.getSsCreator());
    return this.inTrnRepository.save(inTrn);
  }

  public Map deleteInTrn(Long trnNo) {

    this.inTrnRepository.findById(trnNo).orElseThrow(() -> new RejectedExecutionException("Transaction not found for this id: " + trnNo));

    this.inTrnRepository.deleteById(trnNo);
    Map<String, String> deleteMessage = new HashMap<>();
    deleteMessage.put("deleteStatus", "Transaction Deleted Successfully");
    return deleteMessage;
  }

  // IN Trn DTL Information
  public List<InTrndtl> getAllTrndtl() {
    return inTrndtlRepository.findAll(Sort.by("trndtlNo").ascending());
  }

  public List<InTrndtl> getAllTrndtlList(Long trnNo) {
    return inTrndtlRepository.getAllTrnByTrnNo(trnNo);
  }

  public InTrndtl getTrndtl(Long trnNo) throws ResourceNotFoundException {
    return inTrndtlRepository.findById(trnNo).orElseThrow(() -> new ResourceNotFoundException("Transaction Not found for this id: " + trnNo));
  }


  public InTrndtl saveTrndtl(InTrndtl inTrndtl) throws ParseException {
    inTrndtl.setSsCreatedOn(UtillDate.getDateTime());
    inTrndtl.setSsModifiedOn(null);
    inTrndtl.setSsCreator(authService.getEmpNo());
    return inTrndtlRepository.save(inTrndtl);
  }

  public List<InTrndtl> saveTrndtlList(List<InTrndtl> inTrndtls) {
    List<InTrndtl> inTrndtlList = new ArrayList<>();
    inTrndtls.forEach(inTrndtl -> {
      try {
        inTrndtl.setSsCreatedOn(UtillDate.getDateTime());
        inTrndtl.setSsModifiedOn(null);
        inTrndtl.setSsCreator(authService.getEmpNo());
        inTrndtlList.add(this.inTrndtlRepository.save(inTrndtl));
      } catch (ParseException e) {
      }

    });
    return inTrndtlList;
  }

  public InTrndtl updateTrndtl(InTrndtl inTrndtl) throws ResourceNotFoundException, ParseException {
    InTrndtl oldData = this.inTrndtlRepository.findById(inTrndtl.getTrndtlNo()).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id: " + inTrndtl.getTrndtlNo()));
    inTrndtl.setSsCreatedOn(oldData.getSsCreatedOn());
    inTrndtl.setSsModifiedOn(UtillDate.getDateTime());
    return inTrndtlRepository.save(inTrndtl);
  }

  public List<InTrndtl> updateTrndtlList(List<InTrndtl> inTrndtls) throws ResourceNotFoundException, ParseException {
    List<InTrndtl> saveData = new ArrayList<>();
    for (InTrndtl inTrndtl : inTrndtls) {
      InTrndtl oldData = this.inTrndtlRepository.findById(inTrndtl.getTrndtlNo()).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id: " + inTrndtl.getTrndtlNo()));
      inTrndtl.setSsCreatedOn(oldData.getSsCreatedOn());
      inTrndtl.setSsModifiedOn(UtillDate.getDateTime());
      saveData.add(inTrndtlRepository.save(inTrndtl));
    }
    return saveData;
  }

  public Map deleteTrndtl(Long lookupdtlNo) throws ResourceNotFoundException {
    this.inTrndtlRepository.findById(lookupdtlNo).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id: " + lookupdtlNo));
    this.inTrndtlRepository.deleteById(lookupdtlNo);
    Map<String, String> deleteMessage = new HashMap<>();
    deleteMessage.put("deleteStatus", "Deleted Successfully");
    return deleteMessage;
  }

  public Map deleteTrndtlList(List<InTrndtl> inTrndtls) throws ResourceNotFoundException {
    for (InTrndtl inTrndtl : inTrndtls) {
      this.inTrndtlRepository.findById(inTrndtl.getTrndtlNo()).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id: " + inTrndtl.getTrndtlNo()));
      this.inTrndtlRepository.deleteById(inTrndtl.getTrndtlNo());
    }
    Map<String, String> deleteMessage = new HashMap<>();
    deleteMessage.put("deleteStatus", "Deleted Successfully");
    return deleteMessage;
  }

}
