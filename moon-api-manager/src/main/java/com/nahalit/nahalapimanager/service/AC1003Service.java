package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.AcPeriod;
import com.nahalit.nahalapimanager.repository.AcPeriodRepository;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.RejectedExecutionException;

@Service
public class AC1003Service {
    private final AcPeriodRepository acPeriodRepository;
    private final AuthService authService;

    public AC1003Service(AcPeriodRepository acPeriodRepository, AuthService authService) {
        this.acPeriodRepository = acPeriodRepository;
        this.authService = authService;
    }

    // Ac bank
    public List<AcPeriod> getAllAcPeriod() {
        return this.acPeriodRepository.findAll();
    }

    public AcPeriod getAcPeriod(Long periodNo) throws ResourceNotFoundException {
        return this.acPeriodRepository.findById(periodNo).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id:" + periodNo));
    }

    public AcPeriod saveAcPeriod(AcPeriod acBank) throws ParseException {
        acBank.setSsCreatedOn(UtillDate.getDateTime());
        acBank.setSsModifiedOn(null);
        acBank.setSsCreator(authService.getUserNo());
        acBank.setCompanyNo(authService.getCompanyNo());
        return this.acPeriodRepository.save(acBank);
    }

    public List<AcPeriod> saveAcPeriodList(List<AcPeriod> acPeriods) {
        return this.acPeriodRepository.saveAll(acPeriods);
    }

    public AcPeriod updateAcPeriod(AcPeriod acBank) throws ResourceNotFoundException, ParseException {
        AcPeriod oldData = this.acPeriodRepository.findById(acBank.getPeriodNo()).orElseThrow(() -> new ResourceNotFoundException("Transaction not for this:" + acBank.getPeriodNo()));
        acBank.setSsModifiedOn(UtillDate.getDateTime());
        acBank.setSsCreatedOn(oldData.getSsCreatedOn());
        acBank.setSsModifier(authService.getUserNo());
        acBank.setSsCreator(oldData.getSsCreator());
        acBank.setCompanyNo(oldData.getCompanyNo());
        return this.acPeriodRepository.save(acBank);
    }

    public Map deleteAcPeriod(Long periodNo) {

        this.acPeriodRepository.findById(periodNo).orElseThrow(() -> new RejectedExecutionException("Transaction not found for this id: " + periodNo));

        this.acPeriodRepository.deleteById(periodNo);
        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Transaction Deleted Successfully");
        return deleteMessage;
    }

}
