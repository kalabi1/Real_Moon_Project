package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.dao.RL1019Dao;
import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.RlTrnInstallment;
import com.nahalit.nahalapimanager.model.RlTrn;
import com.nahalit.nahalapimanager.model.RlTrnNominee;
import com.nahalit.nahalapimanager.repository.RlTrnInstallmentRepository;
import com.nahalit.nahalapimanager.repository.RlTrnNomineeRepository;
import com.nahalit.nahalapimanager.repository.RlTrnRepository;
import com.nahalit.nahalapimanager.storage.StorageService;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.ParseException;
import java.util.*;
import java.util.concurrent.RejectedExecutionException;

@Service
public class RL1019Service {
    private final RlTrnRepository rlTrnRepository;
    private final RlTrnNomineeRepository rlTrnNomineeRepository;
    private final RlTrnInstallmentRepository rlTrnInstallmentRepository;
    private final RL1019Dao rl1019Dao;
    private final AuthService authService;
    private final StorageService storageService;


    public RL1019Service(RlTrnRepository rlTrnRepository, RlTrnNomineeRepository rlTrnNomineeRepository, RlTrnInstallmentRepository rlTrnInstallmentRepository, RL1019Dao rl1019Dao, AuthService authService, StorageService storageService) {
        this.rlTrnRepository = rlTrnRepository;
        this.rlTrnNomineeRepository = rlTrnNomineeRepository;
        this.rlTrnInstallmentRepository = rlTrnInstallmentRepository;
        this.rl1019Dao = rl1019Dao;
        this.authService = authService;
        this.storageService = storageService;
    }

    // RL Trn
    public List getAllTransaction(Long trnNo) throws ResourceNotFoundException {
        if (trnNo != null) {
            this.rlTrnRepository.findById(trnNo).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id:" + trnNo));
        }
//    return this.rl1004Dao.getAllProjectRef(projectNo);
        return this.rlTrnRepository.findAll();
    }

    public Optional<RlTrn> getTrnDetails(Long trnNo) throws ResourceNotFoundException {
        if (trnNo != null) {
            this.rlTrnRepository.findById(trnNo).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id:" + trnNo));
        }
//    return this.rl1004Dao.getAllProjectRef(projectNo);
        return this.rlTrnRepository.findById(trnNo);
    }


    public List getAllTrnRef(String trnNo, String customerNo, String itemNo, String ssCreartor) {
        return this.rl1019Dao.getTrnList(trnNo, customerNo, itemNo, ssCreartor);
    }

    public Map getTrnDetailsRef(String trnNo) {
        return this.rl1019Dao.getTrnDetails(trnNo);
    }

    public RlTrn saveRlTrn(RlTrn rlTrn) throws ParseException, ResourceNotFoundException {

        if (rlTrn.getTrnId() == null || rlTrn.getTrnId() == "") {
            rlTrn.setTrnId(this.rl1019Dao.getTrnId(rlTrn.getTrnDate()));
            rlTrn.setSsCreatedOn(UtillDate.getDateTime());
            rlTrn.setSsModifiedOn(null);
        } else {
            RlTrn oldData = this.rlTrnRepository.findById(rlTrn.getTrnNo()).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this:" + rlTrn.getTrnNo()));
            rlTrn.setSsCreatedOn(oldData.getSsCreatedOn());
            rlTrn.setSsModifiedOn(UtillDate.getDateTime());
        }
        return this.rlTrnRepository.save(rlTrn);
    }

    public RlTrn updateRlTrn(RlTrn rlTrn) throws ResourceNotFoundException, ParseException {
        RlTrn oldData = this.rlTrnRepository.findById(rlTrn.getTrnNo()).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this:" + rlTrn.getTrnNo()));
        rlTrn.setSsCreatedOn(oldData.getSsCreatedOn());
        rlTrn.setSsModifiedOn(UtillDate.getDateTime());
        return this.rlTrnRepository.save(rlTrn);
    }

    public Map deleteRlTrn(Long trnNo) {
        this.rlTrnRepository.findById(trnNo).orElseThrow(() -> new RejectedExecutionException("Transaction not found for this id: " + trnNo));
        this.rlTrnRepository.deleteById(trnNo);

        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Deleted Successfully");
        return deleteMessage;
    }

    // RL Nominee
    public List<RlTrnNominee> getAllNominee() {
        return this.rlTrnNomineeRepository.findAll();
    }

//    public RlTrnNominee getNominee(Long nomineeNo) {
//        return this.rlTrnNomineeRepository.findById(nomineeNo);
//    }

    public RlTrnNominee getNomineeByTrnNo(Long trnNo) {
        return this.rlTrnNomineeRepository.getNomineeByTrnNo(trnNo);
    }

    public RlTrnNominee saveRlTrnNominee(RlTrnNominee rlTrnNominee) throws ParseException {
        rlTrnNominee.setSsCreatedOn(UtillDate.getDateTime());
        rlTrnNominee.setSsModifiedOn(null);
        return this.rlTrnNomineeRepository.save(rlTrnNominee);
    }

    public List<RlTrnNominee> saveRlTrnNomineeList(List<RlTrnNominee> rlTrnNominees) {
        List<RlTrnNominee> rlTrnNomineeList = new ArrayList<>();
        rlTrnNominees.forEach(rlTrnNominee -> {
            try {
                rlTrnNominee.setSsCreatedOn(UtillDate.getDateTime());
                rlTrnNominee.setSsModifiedOn(null);
                rlTrnNomineeList.add(this.rlTrnNomineeRepository.save(rlTrnNominee));
            } catch (ParseException e) {
            }
        });
        return rlTrnNomineeList;
    }

    public RlTrnNominee updateRlTrnNominee(RlTrnNominee rlTrnNominee) throws ResourceNotFoundException, ParseException {
        RlTrnNominee oldData = this.rlTrnNomineeRepository.findById(rlTrnNominee.getNomineeNo()).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id:" + rlTrnNominee.getNomineeNo()));
        rlTrnNominee.setSsCreatedOn(oldData.getSsCreatedOn());
        rlTrnNominee.setSsModifiedOn(UtillDate.getDateTime());
        return this.rlTrnNomineeRepository.save(rlTrnNominee);
    }

    public List<RlTrnNominee> updateRlTrnNomineeList(List<RlTrnNominee> rlTrnNominees) throws ResourceNotFoundException, ParseException {
        List<RlTrnNominee> saveList = new ArrayList<>();
        for (RlTrnNominee rlTrnNominee : rlTrnNominees) {
            RlTrnNominee oldData = this.rlTrnNomineeRepository.findById(rlTrnNominee.getNomineeNo()).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id:" + rlTrnNominee.getNomineeNo()));
            rlTrnNominee.setSsCreatedOn(oldData.getSsCreatedOn());
            rlTrnNominee.setSsModifiedOn(UtillDate.getDateTime());
            saveList.add(this.rlTrnNomineeRepository.save(rlTrnNominee));
        }
        return saveList;
    }

    public Map deleteRlTrnNominee(Long nomineeNo) throws IOException {
        RlTrnNominee rlTrnNominee = this.rlTrnNomineeRepository.findById(nomineeNo).orElseThrow(() -> new RejectedExecutionException("Transaction not found for this id: " + nomineeNo));
        this.rlTrnNomineeRepository.deleteById(nomineeNo);
        this.storageService.deleteFile(rlTrnNominee.getNomineePictureName());
        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Deleted Successfully");
        return deleteMessage;
    }

    public Map deleteRlTrnNomineeList(List<RlTrnNominee> rlTrnNominees) throws IOException, ResourceNotFoundException {
        for (RlTrnNominee rlTrnNominee : rlTrnNominees) {
            this.rlTrnNomineeRepository.findById(rlTrnNominee.getNomineeNo()).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id: " + rlTrnNominee.getNomineeNo()));
            this.storageService.deleteFile(rlTrnNominee.getNomineePictureName());
            this.rlTrnNomineeRepository.deleteById(rlTrnNominee.getNomineeNo());
        }
        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Deleted Successfully");
        return deleteMessage;
    }

    // RL Trn Installment
    public List<RlTrnInstallment> getAllRlTrnInstallment() {
        return this.rlTrnInstallmentRepository.findAll();
    }

    public List<RlTrnInstallment> getAllRlTrnWiseInstallment(Long trnNo) {
        return this.rlTrnInstallmentRepository.selectAllByTrnNo(trnNo);
    }

    public RlTrnInstallment getRlTrnInstallment(Long installmentNo) throws ResourceNotFoundException {
        return this.rlTrnInstallmentRepository.findById(installmentNo).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id:" + installmentNo));
    }

    public List getTrnInstallmentList(Long trnNo) {
        return this.rl1019Dao.getTrnInstallmentList(trnNo);
    }

    public RlTrnInstallment saveRlTrnInstallment(RlTrnInstallment rlTrnInstallment) throws ParseException {
        rlTrnInstallment.setSsCreatedOn(UtillDate.getDateTime());
        rlTrnInstallment.setSsModifiedOn(null);
        rlTrnInstallment.setSsCreator(authService.getUserNo());
        return this.rlTrnInstallmentRepository.save(rlTrnInstallment);
    }

    public List<RlTrnInstallment> saveRlTrnInstallmentList(List<RlTrnInstallment> inUomList) {
        return this.rlTrnInstallmentRepository.saveAll(inUomList);
    }

    public RlTrnInstallment updateRlTrnInstallment(RlTrnInstallment rlTrnInstallment) throws ResourceNotFoundException, ParseException {
        RlTrnInstallment oldData = this.rlTrnInstallmentRepository.findById(rlTrnInstallment.getInstallmentNo()).orElseThrow(() -> new ResourceNotFoundException("Transaction not for this:" + rlTrnInstallment.getInstallmentNo()));
        rlTrnInstallment.setSsModifiedOn(UtillDate.getDateTime());
        rlTrnInstallment.setSsCreatedOn(oldData.getSsCreatedOn());
        rlTrnInstallment.setSsModifier(authService.getUserNo());
        return this.rlTrnInstallmentRepository.save(rlTrnInstallment);
    }

    public Map deleteRlTrnInstallment(Long installmentNo) {

        this.rlTrnInstallmentRepository.findById(installmentNo).orElseThrow(() -> new RejectedExecutionException("Transaction not found for this id: " + installmentNo));

        this.rlTrnInstallmentRepository.deleteById(installmentNo);
        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Deleted Successfully");
        return deleteMessage;
    }

    public Map getTrnInstallmentCollStatus(Long trnNo) {
        return this.rl1019Dao.getTrnInstallmentCollStatus(trnNo);
    }


    public Map deleteTrnWiseInstallment(Long trnNo) {
        this.rl1019Dao.deleteByTrnNo(trnNo);
        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Deleted Successfully");
        return deleteMessage;
    }
}