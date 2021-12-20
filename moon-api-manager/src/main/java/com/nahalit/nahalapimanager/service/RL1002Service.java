package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.dao.RL1002Dao;
import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.RlCustomer;
import com.nahalit.nahalapimanager.repository.RlCustomerRepository;
import com.nahalit.nahalapimanager.storage.StorageService;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RL1002Service {

    private RlCustomerRepository customerRepository;
    private StorageService storageService;
    private RL1002Dao rl1002Dao;
    private final AuthService authService;

    public RL1002Service(RlCustomerRepository customerRepository, StorageService storageService, RL1002Dao rl1002Dao, AuthService authService) {
        this.customerRepository = customerRepository;
        this.storageService = storageService;
        this.rl1002Dao = rl1002Dao;
        this.authService = authService;
    }

    public List<RlCustomer> getAllCustomer() {
        return this.customerRepository.findAll(Sort.by("customerNo").ascending());
    }

    public RlCustomer getCustomer(Long customerNo) throws ResourceNotFoundException {
        return this.customerRepository.findById(customerNo).orElseThrow(() -> new ResourceNotFoundException("RlCustomer not found for this id: " + customerNo));
    }

    public RlCustomer saveCustomer(RlCustomer customer, MultipartFile customerPhoto) throws ParseException {
        if (customerPhoto != null) {
            String nowTime = UtillDate.getNowTimeNameForImage();
            String filename = StringUtils.cleanPath(customerPhoto.getOriginalFilename()).replaceAll("(?i)(.+?)(\\.\\w+$)", nowTime + "$2");
            storageService.store(customerPhoto, filename);
            customer.setCustomerPictureName(filename);
        }
        customer.setCustomerId(rl1002Dao.getCustomerId());
        customer.setSsCreatedOn(UtillDate.getDateTime());
        customer.setSsModifiedOn(null);
        customer.setCompanyNo(authService.getCompanyNo());
        return this.customerRepository.save(customer);
    }

    public RlCustomer updateCustomer(RlCustomer rlCustomer, MultipartFile customerPhoto) throws ResourceNotFoundException, ParseException {
        RlCustomer oldData = this.customerRepository.findById(rlCustomer.getCustomerNo()).orElseThrow(() -> new ResourceNotFoundException("RlCustomer not found for this id: " + rlCustomer.getCustomerNo()));
        if (customerPhoto != null) {
            if (rlCustomer.getCustomerPictureName().length() > 0) {
                try {
                    storageService.deleteFile(rlCustomer.getCustomerPictureName());
                } catch (Exception e) {
                }
            }

            String nowTime = UtillDate.getNowTimeNameForImage();
            String filename = StringUtils.cleanPath(customerPhoto.getOriginalFilename()).replaceAll("(?i)(.+?)(\\.\\w+$)", nowTime + "$2");
            storageService.store(customerPhoto, filename);
            rlCustomer.setCustomerPictureName(filename);
                    }
        rlCustomer.setSsCreatedOn(oldData.getSsCreatedOn());
        rlCustomer.setSsModifiedOn(UtillDate.getDateTime());
        rlCustomer.setCompanyNo(authService.getCompanyNo());

        return this.customerRepository.save(rlCustomer);
    }

    public Map deleteCustomer(Long customerNo) throws ResourceNotFoundException, IOException {
        RlCustomer rlCustomer = this.customerRepository.findById(customerNo).orElseThrow(() -> new ResourceNotFoundException("RlCustomer not found for this id: " + customerNo));
        try {
            storageService.deleteFile(rlCustomer.getCustomerPictureName());
        } catch (Exception e) {
        }
        this.customerRepository.deleteById(customerNo);
        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Customer Deleted Successfully");
        return deleteMessage;
    }

    public Map<String, Object> customerLogin(String customerUsername, String password) {
        return rl1002Dao.isCustomerLogin(customerUsername, password);
    }


    public String forgotPasswordByMail(String email) {
        return rl1002Dao.forgotPasswordByMail(email);
    }

    public Map getHasEmail(String email) {
        return rl1002Dao.getHasEmail(email);
    }

    public Map getHasMobile(String mobile) {
        return rl1002Dao.getHasMobile(mobile);
    }

}
