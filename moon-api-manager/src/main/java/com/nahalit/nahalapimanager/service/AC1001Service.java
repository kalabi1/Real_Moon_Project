package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.AcVouchertype;
import com.nahalit.nahalapimanager.repository.AcVouchertypeRepository;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.RejectedExecutionException;

@Service
public class AC1001Service {
    private final AcVouchertypeRepository acVouchertypeRepository;
    private final AuthService authService;

    public AC1001Service(AcVouchertypeRepository acVouchertypeRepository, AuthService authService) {
        this.acVouchertypeRepository = acVouchertypeRepository;
        this.authService = authService;
    }

    // Ac Voucher Type
    public List<AcVouchertype> getAllAcVouchertype() {
        return this.acVouchertypeRepository.findAll();
    }

    public AcVouchertype getAcVouchertype(Long vtypeNo) throws ResourceNotFoundException {
        return this.acVouchertypeRepository.findById(vtypeNo).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id:" + vtypeNo));
    }

    public AcVouchertype saveAcVouchertype(AcVouchertype acVouchertype) throws ParseException {
        acVouchertype.setSsCreatedOn(UtillDate.getDateTime());
        acVouchertype.setSsModifiedOn(null);
        acVouchertype.setSsCreator(authService.getUserNo());
        acVouchertype.setCompanyNo(authService.getCompanyNo());
        return this.acVouchertypeRepository.save(acVouchertype);
    }

    public List<AcVouchertype> saveAcVouchertypeList(List<AcVouchertype> acVouchertypeList) {
        return this.acVouchertypeRepository.saveAll(acVouchertypeList);
    }

    public AcVouchertype updateAcVouchertype(AcVouchertype acVouchertype) throws ResourceNotFoundException, ParseException {
        AcVouchertype oldData = this.acVouchertypeRepository.findById(acVouchertype.getVtypeNo()).orElseThrow(() -> new ResourceNotFoundException("Transaction not for this:" + acVouchertype.getVtypeNo()));
        acVouchertype.setSsModifiedOn(UtillDate.getDateTime());
        acVouchertype.setSsCreatedOn(oldData.getSsCreatedOn());
        acVouchertype.setSsModifier(authService.getUserNo());
        acVouchertype.setSsCreator(oldData.getSsCreator());
        acVouchertype.setCompanyNo(oldData.getCompanyNo());
        return this.acVouchertypeRepository.save(acVouchertype);
    }

    public Map deleteAcVouchertype(Long vtypeNo) {

        this.acVouchertypeRepository.findById(vtypeNo).orElseThrow(() -> new RejectedExecutionException("Transaction not found for this id: " + vtypeNo));

        this.acVouchertypeRepository.deleteById(vtypeNo);
        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Transaction Deleted Successfully");
        return deleteMessage;
    }

}
