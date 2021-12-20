package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import com.nahalit.nahalapimanager.model.SaLookup;
import com.nahalit.nahalapimanager.model.SaLookupdtl;
import com.nahalit.nahalapimanager.repository.SaLookupRepository;
import com.nahalit.nahalapimanager.repository.SaLookupdtlRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SA1004Service {
    private final SaLookupRepository saLookupRepository;
    private final SaLookupdtlRepository saLookupdtlRepository;
    private final AuthService authService;

    public SA1004Service(SaLookupRepository saLookupRepository, SaLookupdtlRepository saLookupdtlRepository, AuthService authService) {
        this.saLookupRepository = saLookupRepository;
        this.saLookupdtlRepository = saLookupdtlRepository;
        this.authService = authService;
    }

    // SA Lookup Information
    public List<SaLookup> getAllLookup() {
        return saLookupRepository.findAll();
    }

    public SaLookup getLookup(Long lookupNo) throws ResourceNotFoundException {
        return saLookupRepository.findById(lookupNo).orElseThrow(() -> new ResourceNotFoundException("Lopokup Not found for this id: " + lookupNo));
    }

    public SaLookup saveLookup(SaLookup saLookup) throws ParseException {
        saLookup.setSsCreatedOn(UtillDate.getDateTime());
        saLookup.setSsModifiedOn(null);
        saLookup.setSsCreator(authService.getEmpNo());
        return saLookupRepository.save(saLookup);
    }

    public List<SaLookup> saveLookupList(List<SaLookup> saLookups) {
        List<SaLookup> saLookupList = new ArrayList<>();
        saLookups.forEach(saLookup -> {
            try {
                saLookup.setSsCreatedOn(UtillDate.getDateTime());
                saLookup.setSsModifiedOn(null);
                saLookup.setSsCreator(authService.getEmpNo());
                saLookupList.add(this.saLookupRepository.save(saLookup));
            } catch (ParseException e) {
            }

        });
        return saLookupList;
    }

    public SaLookup updateLookup(SaLookup saLookup) throws ResourceNotFoundException, ParseException {
        SaLookup oldData = this.saLookupRepository.findById(saLookup.getLookupNo()).orElseThrow(() -> new ResourceNotFoundException("Lookup not found for this id: " + saLookup.getLookupNo()));
        saLookup.setSsCreatedOn(oldData.getSsCreatedOn());
        saLookup.setSsModifiedOn(UtillDate.getDateTime());
        saLookup.setSsCreator(oldData.getSsCreator());
        saLookup.setSsModifier(authService.getEmpNo());
        return saLookupRepository.save(saLookup);
    }

    public Map deleteLookup(Long lookupNo) throws ResourceNotFoundException {
        this.saLookupRepository.findById(lookupNo).orElseThrow(() -> new ResourceNotFoundException("Lookup not found for this id: " + lookupNo));
        this.saLookupRepository.deleteById((lookupNo));
        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Deleted Successfully");
        return deleteMessage;
    }

    // SA Lookup DTL Information
    public List<SaLookupdtl> getAllLookupdtl() {
        return saLookupdtlRepository.findAll(Sort.by("lookupdtlNo").ascending());
    }

    public List<SaLookupdtl> getAllLookupdtlList(Long lookupNo) {
        return saLookupdtlRepository.findAllByLookupNo(lookupNo);
    }

    public SaLookupdtl getLookupdtl(Long lookupNo) throws ResourceNotFoundException {
        return saLookupdtlRepository.findById(lookupNo).orElseThrow(() -> new ResourceNotFoundException("Lopokup Not found for this id: " + lookupNo));
    }


    public SaLookupdtl saveLookupdtl(SaLookupdtl saLookupdtl) throws ParseException {
        saLookupdtl.setSsCreatedOn(UtillDate.getDateTime());
        saLookupdtl.setSsModifiedOn(null);
        saLookupdtl.setSsCreator(authService.getEmpNo());
        return saLookupdtlRepository.save(saLookupdtl);
    }

    public List<SaLookupdtl> saveLookupdtlList(List<SaLookupdtl> saLookupdtls) {
        List<SaLookupdtl> saLookupdtlList = new ArrayList<>();
        saLookupdtls.forEach(saLookupdtl -> {
            try {
                saLookupdtl.setSsCreatedOn(UtillDate.getDateTime());
                saLookupdtl.setSsModifiedOn(null);
                saLookupdtl.setSsCreator(authService.getEmpNo());
                saLookupdtlList.add(this.saLookupdtlRepository.save(saLookupdtl));
            } catch (ParseException e) {
            }

        });
        return saLookupdtlList;
    }

    public SaLookupdtl updateLookupdtl(SaLookupdtl saLookupdtl) throws ResourceNotFoundException, ParseException {
        SaLookupdtl oldData = this.saLookupdtlRepository.findById(saLookupdtl.getLookupNo()).orElseThrow(() -> new ResourceNotFoundException("Lookupdtl not found for this id: " + saLookupdtl.getLookupdtlNo()));
        saLookupdtl.setSsCreatedOn(oldData.getSsCreatedOn());
        saLookupdtl.setSsModifiedOn(UtillDate.getDateTime());
        return saLookupdtlRepository.save(saLookupdtl);
    }

    public List<SaLookupdtl> updateLookupdtlList(List<SaLookupdtl> saLookupdtls) throws ResourceNotFoundException, ParseException {
        List<SaLookupdtl> saveData = new ArrayList<>();
        for (SaLookupdtl saLookupdtl : saLookupdtls) {
            SaLookupdtl oldData = this.saLookupdtlRepository.findById(saLookupdtl.getLookupNo()).orElseThrow(() -> new ResourceNotFoundException("Lookupdtl not found for this id: " + saLookupdtl.getLookupdtlNo()));
            saLookupdtl.setSsCreatedOn(oldData.getSsCreatedOn());
            saLookupdtl.setSsModifiedOn(UtillDate.getDateTime());
            saveData.add(saLookupdtlRepository.save(saLookupdtl));
        }
        return saveData;
    }

    public Map deleteLookupdtl(Long lookupdtlNo) throws ResourceNotFoundException {
        this.saLookupdtlRepository.findById(lookupdtlNo).orElseThrow(() -> new ResourceNotFoundException("Lookupdtl not found for this id: " + lookupdtlNo));
        this.saLookupdtlRepository.deleteById(lookupdtlNo);
        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Deleted Successfully");
        return deleteMessage;
    }

    public Map deleteLookupdtlList(List<SaLookupdtl> saLookupdtls) throws ResourceNotFoundException {
        for (SaLookupdtl saLookupdtl : saLookupdtls) {
            this.saLookupdtlRepository.findById(saLookupdtl.getLookupdtlNo()).orElseThrow(() -> new ResourceNotFoundException("Lookupdtl not found for this id: " + saLookupdtl.getLookupdtlNo()));
            this.saLookupdtlRepository.deleteById(saLookupdtl.getLookupdtlNo());
        }
        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Deleted Successfully");
        return deleteMessage;
    }
}
