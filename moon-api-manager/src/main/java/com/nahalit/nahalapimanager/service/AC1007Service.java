package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.dao.AC1007Dao;
import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.AcCostcenter;
import com.nahalit.nahalapimanager.repository.AcCostcenterRepository;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.RejectedExecutionException;

@Service
public class AC1007Service {
    private final AcCostcenterRepository acCostcenterRepository;
    private final AuthService authService;
    private final AC1007Dao ac1007Dao;

    public AC1007Service(AcCostcenterRepository acCostcenterRepository, AuthService authService, AC1007Dao ac1007Dao) {
        this.acCostcenterRepository = acCostcenterRepository;
        this.authService = authService;
        this.ac1007Dao = ac1007Dao;
    }


    // Ac Costcenter
    public List<AcCostcenter> getAllAcCostcenter() {
        return this.acCostcenterRepository.findAll();
    }

    public AcCostcenter getAcCostcenter(Long costNo) throws ResourceNotFoundException {
        return this.acCostcenterRepository.findById(costNo).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id:" + costNo));
    }

    public List getCostCenterTree(String costName) {
        return ac1007Dao.getCostCenterTree(costName);
    }

    public AcCostcenter saveAcCostcenter(AcCostcenter acCostcenter) throws ParseException {
        acCostcenter.setSsCreatedOn(UtillDate.getDateTime());
        acCostcenter.setSsModifiedOn(null);
        acCostcenter.setSsCreator(authService.getUserNo());
        acCostcenter.setCompanyNo(authService.getCompanyNo());
        return this.acCostcenterRepository.save(acCostcenter);
    }

    public List<AcCostcenter> saveAcCostcenterList(List<AcCostcenter> acCostcenterList) {
        return this.acCostcenterRepository.saveAll(acCostcenterList);
    }

    public AcCostcenter updateAcCostcenter(AcCostcenter acCostcenter) throws ResourceNotFoundException, ParseException {
        AcCostcenter oldData = this.acCostcenterRepository.findById(acCostcenter.getCostNo()).orElseThrow(() -> new ResourceNotFoundException("Transaction not for this:" + acCostcenter.getCostNo()));
        acCostcenter.setSsModifiedOn(UtillDate.getDateTime());
        acCostcenter.setSsCreatedOn(oldData.getSsCreatedOn());
        acCostcenter.setSsModifier(authService.getUserNo());
        acCostcenter.setSsCreator(oldData.getSsCreator());
        acCostcenter.setCompanyNo(oldData.getCompanyNo());
        return this.acCostcenterRepository.save(acCostcenter);
    }

    public Map deleteAcCostcenter(Long costNo) {

        this.acCostcenterRepository.findById(costNo).orElseThrow(() -> new RejectedExecutionException("Transaction not found for this id: " + costNo));

        this.acCostcenterRepository.deleteById(costNo);
        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Transaction Deleted Successfully");
        return deleteMessage;
    }

}
