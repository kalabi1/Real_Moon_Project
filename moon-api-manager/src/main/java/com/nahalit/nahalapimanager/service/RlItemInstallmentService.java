package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import com.nahalit.nahalapimanager.model.RlItemInstallment;
import com.nahalit.nahalapimanager.repository.RlItemInstallmentRepository;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.RejectedExecutionException;

@Service
public class RlItemInstallmentService {
  private RlItemInstallmentRepository rlItemInstallmentRepository;

  public RlItemInstallmentService(RlItemInstallmentRepository rlItemInstallmentRepository) {
    this.rlItemInstallmentRepository = rlItemInstallmentRepository;
  }

  // RL Item Installment Service
  public List<RlItemInstallment> getAllRlItemInstallment() {
    return this.rlItemInstallmentRepository.findAll();
  }

  public RlItemInstallment getRlItemInstallment(Long installmentNo) throws ResourceNotFoundException {
    return this.rlItemInstallmentRepository.findById(installmentNo).orElseThrow(() -> new ResourceNotFoundException("Item Installment not found for this id:" + installmentNo));
  }

  public List<RlItemInstallment> getRlItemInstallmentList(Long itemNo) {
    return this.rlItemInstallmentRepository.findAllByItemNo(itemNo);
  }

  public RlItemInstallment saveRlItemInstallment(RlItemInstallment reRlItemInstallment) throws ParseException {
    reRlItemInstallment.setSsCreatedOn(UtillDate.getDateTime());
    reRlItemInstallment.setSsModifiedOn(null);
    return this.rlItemInstallmentRepository.save(reRlItemInstallment);
  }

  public List<RlItemInstallment> saveRlItemInstallmentList(List<RlItemInstallment> rlItemInstallments) {
    List<RlItemInstallment> rlItemInstallmentList = new ArrayList<>();
    rlItemInstallments.forEach(rlItemInstallment -> {
      try {
        rlItemInstallment.setSsCreatedOn(UtillDate.getDateTime());
        rlItemInstallment.setSsModifiedOn(null);
        rlItemInstallmentList.add(this.rlItemInstallmentRepository.save(rlItemInstallment));
      } catch (ParseException e) {
      }
    });
    return rlItemInstallmentList;
  }

  public RlItemInstallment updateRlItemInstallment(RlItemInstallment rlItemInstallment) throws ResourceNotFoundException, ParseException {
    RlItemInstallment oldData = this.rlItemInstallmentRepository.findById(rlItemInstallment.getInstallmentNo()).orElseThrow(() -> new ResourceNotFoundException("Item Installment not for this:" + rlItemInstallment.getInstallmentNo()));
    rlItemInstallment.setSsCreatedOn(oldData.getSsCreatedOn());
    rlItemInstallment.setSsModifiedOn(UtillDate.getDateTime());
    return this.rlItemInstallmentRepository.save(rlItemInstallment);
  }

  public List<RlItemInstallment> updateRlItemInstallmentList(List<RlItemInstallment> rlItemInstallments) throws ResourceNotFoundException, ParseException {
    List<RlItemInstallment> saveList = new ArrayList<>();
    for (RlItemInstallment rlItemInstallment : rlItemInstallments) {
      RlItemInstallment oldData = this.rlItemInstallmentRepository.findById(rlItemInstallment.getInstallmentNo()).orElseThrow(() -> new ResourceNotFoundException("Item Installment not for this:" + rlItemInstallment.getInstallmentNo()));
      rlItemInstallment.setSsCreatedOn(oldData.getSsCreatedOn());
      rlItemInstallment.setSsModifiedOn(UtillDate.getDateTime());
      saveList.add(this.rlItemInstallmentRepository.save(rlItemInstallment));
    }
    return saveList;
  }

  public Map deleteRlItemInstallment(Long installmentNo) {
    this.rlItemInstallmentRepository.findById(installmentNo).orElseThrow(() -> new RejectedExecutionException("Item Installment not found for this id: " + installmentNo));
    this.rlItemInstallmentRepository.deleteById(installmentNo);
    Map<String, String> deleteMessage = new HashMap<>();
    deleteMessage.put("deleteStatus", "Deleted Successfully");
    return deleteMessage;
  }

  public Map deleteRlItemInstallmentList(List<RlItemInstallment> rlItemInstallments) {
    for (RlItemInstallment rlItemInstallment : rlItemInstallments) {
      this.rlItemInstallmentRepository.findById(rlItemInstallment.getInstallmentNo()).orElseThrow(() -> new RejectedExecutionException("Item Installment not found for this id: " + rlItemInstallment.getInstallmentNo()));
      this.rlItemInstallmentRepository.deleteById(rlItemInstallment.getInstallmentNo());
    }
    Map<String, String> deleteMessage = new HashMap<>();
    deleteMessage.put("deleteStatus", "Deleted Successfully");
    return deleteMessage;
  }
}
