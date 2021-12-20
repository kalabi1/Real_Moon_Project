package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.InUom;
import com.nahalit.nahalapimanager.repository.InUomRepository;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.RejectedExecutionException;

@Service
public class IN1001Service {
    private final InUomRepository inUomRepository;
    private final AuthService authService;

    public IN1001Service(InUomRepository inUomRepository, AuthService authService) {
        this.inUomRepository = inUomRepository;
        this.authService = authService;
    }

    // In Uom
    public List<InUom> getAllInUom() {
        return this.inUomRepository.findAll();
    }

    public InUom getInUom(Long uomNo) throws ResourceNotFoundException {
        return this.inUomRepository.findById(uomNo).orElseThrow(() -> new ResourceNotFoundException("Uom not found for this id:" + uomNo));
    }

    public InUom saveInUom(InUom inUom) throws ParseException {
        inUom.setSsCreatedOn(UtillDate.getDateTime());
        inUom.setSsModifiedOn(null);
        inUom.setSsCreator(authService.getUserNo());
        inUom.setCompanyNo(authService.getCompanyNo());
        return this.inUomRepository.save(inUom);
    }

    public List<InUom> saveInUomList(List<InUom> inUomList) {
        return this.inUomRepository.saveAll(inUomList);
    }

    public InUom updateInUom(InUom inUom) throws ResourceNotFoundException, ParseException {
        InUom oldData = this.inUomRepository.findById(inUom.getUomNo()).orElseThrow(() -> new ResourceNotFoundException("Uom not for this:" + inUom.getUomNo()));
        inUom.setSsModifiedOn(UtillDate.getDateTime());
        inUom.setSsCreatedOn(oldData.getSsCreatedOn());
        inUom.setSsModifier(authService.getUserNo());
        inUom.setSsCreator(oldData.getSsCreator());
        inUom.setCompanyNo(oldData.getCompanyNo());
        return this.inUomRepository.save(inUom);
    }

    public Map deleteInUom(Long uomNo) {

        this.inUomRepository.findById(uomNo).orElseThrow(() -> new RejectedExecutionException("Uom not found for this id: " + uomNo));

        this.inUomRepository.deleteById(uomNo);
        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Uom Deleted Successfully");
        return deleteMessage;
    }

}
