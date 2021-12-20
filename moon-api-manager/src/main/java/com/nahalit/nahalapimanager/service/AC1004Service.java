package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.AcNature;
import com.nahalit.nahalapimanager.repository.AcNatureRepository;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.RejectedExecutionException;

@Service
public class AC1004Service {
    private final AcNatureRepository acNatureRepository;
    private final AuthService authService;

    public AC1004Service(AcNatureRepository acNatureRepository, AuthService authService) {
        this.acNatureRepository = acNatureRepository;
        this.authService = authService;
    }


    // Ac Nature
    public List<AcNature> getAllAcNature() {
        return this.acNatureRepository.findAll(Sort.by("slNo").ascending());
    }

    public AcNature getAcNature(Long natureNo) throws ResourceNotFoundException {
        return this.acNatureRepository.findById(natureNo).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id:" + natureNo));
    }

    public AcNature saveAcNature(AcNature acNature) throws ParseException {
        acNature.setSsCreatedOn(UtillDate.getDateTime());
        acNature.setSsModifiedOn(null);
        acNature.setSsCreator(authService.getUserNo());
        acNature.setCompanyNo(authService.getCompanyNo());
        return this.acNatureRepository.save(acNature);
    }

    public List<AcNature> saveAcNatureList(List<AcNature> acNatureList) {
        return this.acNatureRepository.saveAll(acNatureList);
    }

    public AcNature updateAcNature(AcNature acNature) throws ResourceNotFoundException, ParseException {
        AcNature oldData = this.acNatureRepository.findById(acNature.getNatureNo()).orElseThrow(() -> new ResourceNotFoundException("Transaction not for this:" + acNature.getNatureNo()));
        acNature.setSsModifiedOn(UtillDate.getDateTime());
        acNature.setSsCreatedOn(oldData.getSsCreatedOn());
        acNature.setSsModifier(authService.getUserNo());
        acNature.setSsCreator(oldData.getSsCreator());
        acNature.setCompanyNo(oldData.getCompanyNo());
        return this.acNatureRepository.save(acNature);
    }

    public Map deleteAcNature(Long natureNo) {

        this.acNatureRepository.findById(natureNo).orElseThrow(() -> new RejectedExecutionException("Transaction not found for this id: " + natureNo));

        this.acNatureRepository.deleteById(natureNo);
        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Transaction Deleted Successfully");
        return deleteMessage;
    }

}
