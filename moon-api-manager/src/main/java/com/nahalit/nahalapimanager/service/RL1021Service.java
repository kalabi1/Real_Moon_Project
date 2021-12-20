package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.dao.RL1021Dao;
import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.RlCollection;
import com.nahalit.nahalapimanager.repository.RlCollectionRepository;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.RejectedExecutionException;

@Service
public class RL1021Service {
    private final RlCollectionRepository rlCollectionRepository;
    private final RL1021Dao rl1021Dao;
    private final AuthService authService;

    public RL1021Service(RlCollectionRepository rlCollectionRepository, RL1021Dao rl1021Dao, AuthService authService) {
        this.rlCollectionRepository = rlCollectionRepository;
        this.rl1021Dao = rl1021Dao;
        this.authService = authService;
    }

    public List getTrnBalanceList() {
        return rl1021Dao.getTrnBalanceList();
    }

    // RL Collection
    public List<RlCollection> getAllRlCollection() {
        return this.rlCollectionRepository.findAll(Sort.by("collNo").descending());
    }

    public RlCollection getRlCollection(Long collectionNo) throws ResourceNotFoundException {
        return this.rlCollectionRepository.findById(collectionNo).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id:" + collectionNo));
    }

    public RlCollection saveRlCollection(RlCollection rlCollection) throws ParseException {
        rlCollection.setCollId(rl1021Dao.getCollId(rlCollection.getCollDate()));
        rlCollection.setSsCreatedOn(UtillDate.getDateTime());
        rlCollection.setSsModifiedOn(null);
        rlCollection.setSsCreator(authService.getUserNo());
        return this.rlCollectionRepository.save(rlCollection);
    }

    public List<RlCollection> saveRlCollectionList(List<RlCollection> rlCollectionList) {
        return this.rlCollectionRepository.saveAll(rlCollectionList);
    }

    public RlCollection updateRlCollection(RlCollection rlCollection) throws ResourceNotFoundException, ParseException {
        RlCollection oldData = this.rlCollectionRepository.findById(rlCollection.getCollNo()).orElseThrow(() -> new ResourceNotFoundException("Uom not for this:" + rlCollection.getCollNo()));
        rlCollection.setSsModifiedOn(UtillDate.getDateTime());
        rlCollection.setSsCreatedOn(oldData.getSsCreatedOn());
        rlCollection.setSsModifier(authService.getUserNo());
        return this.rlCollectionRepository.save(rlCollection);
    }

    public Map deleteRlCollection(Long collectionNo) {
        this.rlCollectionRepository.findById(collectionNo).orElseThrow(() -> new RejectedExecutionException("Uom not found for this id: " + collectionNo));
        this.rlCollectionRepository.deleteById(collectionNo);
        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Transaction Deleted Successfully");
        return deleteMessage;
    }

}
