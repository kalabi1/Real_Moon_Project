package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.SlCustomer;
import com.nahalit.nahalapimanager.repository.SlCustomerRepository;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.RejectedExecutionException;

@Service
public class SL1001Service {
    private final SlCustomerRepository slCustomerRepository;
    private final AuthService authService;

    public SL1001Service(SlCustomerRepository slCustomerRepository, AuthService authService) {
        this.slCustomerRepository = slCustomerRepository;
        this.authService = authService;
    }

    // In Transaction
    public List<SlCustomer> getAllSlCustomer() {
        return this.slCustomerRepository.findAll();
    }

    public SlCustomer getSlCustomer(Long customerNo) throws ResourceNotFoundException {
        return this.slCustomerRepository.findById(customerNo).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id:" + customerNo));
    }

    public SlCustomer saveSlCustomer(SlCustomer slCustomer) throws ParseException {
        slCustomer.setSsCreatedOn(UtillDate.getDateTime());
        slCustomer.setSsModifiedOn(null);
        slCustomer.setSsCreator(authService.getUserNo());
        slCustomer.setCompanyNo(authService.getCompanyNo());
        return this.slCustomerRepository.save(slCustomer);
    }

    public List<SlCustomer> saveSlCustomerList(List<SlCustomer> slCustomerList) {
        return this.slCustomerRepository.saveAll(slCustomerList);
    }

    public SlCustomer updateSlCustomer(SlCustomer slCustomer) throws ResourceNotFoundException, ParseException {
        SlCustomer oldData = this.slCustomerRepository.findById(slCustomer.getCustomerNo()).orElseThrow(() -> new ResourceNotFoundException("Transaction not for this:" + slCustomer.getCustomerNo()));
        slCustomer.setSsModifiedOn(UtillDate.getDateTime());
        slCustomer.setSsCreatedOn(oldData.getSsCreatedOn());
        slCustomer.setSsModifier(authService.getUserNo());
        slCustomer.setSsCreator(oldData.getSsCreator());
        slCustomer.setCompanyNo(oldData.getCompanyNo());
        return this.slCustomerRepository.save(slCustomer);
    }

    public Map deleteSlCustomer(Long customerNo) {

        this.slCustomerRepository.findById(customerNo).orElseThrow(() -> new RejectedExecutionException("Transaction not found for this id: " + customerNo));

        this.slCustomerRepository.deleteById(customerNo);
        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Transaction Deleted Successfully");
        return deleteMessage;
    }

}
