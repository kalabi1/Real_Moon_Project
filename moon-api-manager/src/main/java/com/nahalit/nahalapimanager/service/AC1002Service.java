package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.AcBank;
import com.nahalit.nahalapimanager.repository.AcBankRepository;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.RejectedExecutionException;

@Service
public class AC1002Service {
    private final AcBankRepository acBankRepository;
    private final AuthService authService;

    public AC1002Service(AcBankRepository acBankRepository, AuthService authService) {
        this.acBankRepository = acBankRepository;
        this.authService = authService;
    }


    // Ac bank
    public List<AcBank> getAllAcBank() {
        return this.acBankRepository.findAll();
    }

    public AcBank getAcBank(Long bankNo) throws ResourceNotFoundException {
        return this.acBankRepository.findById(bankNo).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id:" + bankNo));
    }

    public AcBank saveAcBank(AcBank acBank) throws ParseException {
        acBank.setSsCreatedOn(UtillDate.getDateTime());
        acBank.setSsModifiedOn(null);
        acBank.setSsCreator(authService.getUserNo());
        acBank.setCompanyNo(authService.getCompanyNo());
        return this.acBankRepository.save(acBank);
    }

    public List<AcBank> saveAcBankList(List<AcBank> acBankList) {
        return this.acBankRepository.saveAll(acBankList);
    }

    public AcBank updateAcBank(AcBank acBank) throws ResourceNotFoundException, ParseException {
        AcBank oldData = this.acBankRepository.findById(acBank.getBankNo()).orElseThrow(() -> new ResourceNotFoundException("Transaction not for this:" + acBank.getBankNo()));
        acBank.setSsModifiedOn(UtillDate.getDateTime());
        acBank.setSsCreatedOn(oldData.getSsCreatedOn());
        acBank.setSsModifier(authService.getUserNo());
        acBank.setSsCreator(oldData.getSsCreator());
        acBank.setCompanyNo(oldData.getCompanyNo());
        return this.acBankRepository.save(acBank);
    }

    public Map deleteAcBank(Long bankNo) {

        this.acBankRepository.findById(bankNo).orElseThrow(() -> new RejectedExecutionException("Transaction not found for this id: " + bankNo));

        this.acBankRepository.deleteById(bankNo);
        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Transaction Deleted Successfully");
        return deleteMessage;
    }

}
