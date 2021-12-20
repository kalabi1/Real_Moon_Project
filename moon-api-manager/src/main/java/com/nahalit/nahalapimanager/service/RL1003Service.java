package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.dao.RL1003Dao;
import com.nahalit.nahalapimanager.dao.RLProjectDao;
import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.RlItemSize;
import com.nahalit.nahalapimanager.model.RlProject;
import com.nahalit.nahalapimanager.repository.RlItemSizeRepository;
import com.nahalit.nahalapimanager.repository.RlProjectRepository;
import com.nahalit.nahalapimanager.storage.StorageService;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.RejectedExecutionException;

@Service
public class RL1003Service {
    private final RlProjectRepository rlProjectRepository;
    private final RlItemSizeRepository rlItemSizeRepository;
    private final RL1003Dao rl1003Dao;
    private final RLProjectDao rlProjectDao;
    private final StorageService storageService;

    public RL1003Service(RlProjectRepository rlProjectRepository, RlItemSizeRepository rlItemSizeRepository, @Qualifier("RL1003Dao") RL1003Dao rl1003Dao, RLProjectDao rlProjectDao, StorageService storageService) {
        this.rlProjectRepository = rlProjectRepository;
        this.rlItemSizeRepository = rlItemSizeRepository;
        this.rl1003Dao = rl1003Dao;
        this.rlProjectDao = rlProjectDao;
        this.storageService = storageService;
    }

    // RL Apartment Project Service
    public List getAllProject(Long projectNo) throws ResourceNotFoundException {
        if (projectNo != null) {
            this.rlProjectRepository.findById(projectNo).orElseThrow(() -> new ResourceNotFoundException("Land Project not found for this id:" + projectNo));
        }
//    return this.rl1003Dao.getAllProjectRef(projectNo);
        return this.rlProjectDao.getProjectList(projectNo != null ? "" + projectNo : "", "" + 2, "", "", "", "","");
    }

    public Object getProject(Long projectNo) throws ResourceNotFoundException {
        this.rlProjectRepository.findById(projectNo).orElseThrow(() -> new ResourceNotFoundException("Apartment Project not found for this id:" + projectNo));
//    return rl1003Dao.getProjectRef(projectNo);
        return rlProjectDao.getProjectDetails("" + projectNo);
    }

    public RlProject saveRlProject(RlProject rlProject) throws ParseException {
        rlProject.setProjectTypeNo(2);
        rlProject.setSsCreatedOn(UtillDate.getDateTime());
        rlProject.setSsModifiedOn(null);
        rlProject.setProjectId(rlProjectDao.getProjectId("2"));
        return this.rlProjectRepository.save(rlProject);
    }

    public RlProject updateRlProject(RlProject rlProject) throws ResourceNotFoundException, ParseException, IOException {
        RlProject oldData = this.rlProjectRepository.findById(rlProject.getProjectNo()).orElseThrow(() -> new ResourceNotFoundException("Apartment Project not for this:" + rlProject.getProjectNo()));
        if (oldData.getProjectLayoutPhoto() != null && rlProject.getProjectLayoutPhoto() != null && !oldData.getProjectLayoutPhoto().equalsIgnoreCase(rlProject.getProjectLayoutPhoto())) {
            this.storageService.deleteFile(oldData.getProjectLayoutPhoto());
        }
        rlProject.setSsCreatedOn(oldData.getSsCreatedOn());
        rlProject.setSsModifiedOn(UtillDate.getDateTime());
        return this.rlProjectRepository.save(rlProject);
    }

    public Map deleteRlProject(Long projectNo) throws IOException {
        RlProject rlProject = this.rlProjectRepository.findById(projectNo).orElseThrow(() -> new RejectedExecutionException("Apartment Project not found for this id: " + projectNo));
        this.rlProjectRepository.deleteById(projectNo);
        this.storageService.deleteFile(rlProject.getProjectLayoutPhoto());
        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Apartment Project Deleted Successfully");
        return deleteMessage;

    }

    // Flat Type Wise Size setup
    public List<RlItemSize> getAllItemSize() {
        return this.rlItemSizeRepository.findAll();
    }

    public RlItemSize getItemSize(Long sizeNo) {
        return this.rlItemSizeRepository.findById(sizeNo).orElseThrow(() -> new RejectedExecutionException("Item sieze not found for this id: " + sizeNo));
    }

    public List<RlItemSize> getAllItemSizeList(Long projectNo) {
        return this.rlItemSizeRepository.getAllByProjectNo(projectNo);
    }

    public RlItemSize saveItemSize(RlItemSize rlItemSize) throws ParseException {
        rlItemSize.setSsCreatedOn(UtillDate.getDateTime());
        rlItemSize.setSsModifiedOn(null);
        return this.rlItemSizeRepository.save(rlItemSize);
    }

    public List<RlItemSize> saveItemSizeList(List<RlItemSize> rlItemSizes) {
        List<RlItemSize> rlItemSizeList = new ArrayList<>();
        rlItemSizes.forEach(rlItemSize -> {
            try {
                rlItemSize.setSsCreatedOn(UtillDate.getDateTime());
                rlItemSize.setSsModifiedOn(null);
                rlItemSizeList.add(this.rlItemSizeRepository.save(rlItemSize));
            } catch (ParseException e) {
            }
        });
        return rlItemSizeList;
    }

    public RlItemSize updateItemSize(RlItemSize rlItemSize) throws ParseException {
        RlItemSize oldData = this.rlItemSizeRepository.findById(rlItemSize.getSizeNo()).orElseThrow(() -> new RejectedExecutionException("Item size not found for this id: " + rlItemSize.getSizeNo()));
        rlItemSize.setSsCreatedOn(oldData.getSsCreatedOn());
        rlItemSize.setSsModifiedOn(UtillDate.getDateTime());
        return this.rlItemSizeRepository.save(rlItemSize);
    }

    public List<RlItemSize> updateItemSizeList(List<RlItemSize> rlItemSizes) throws ParseException {
        List<RlItemSize> saveList = new ArrayList<>();
        for (RlItemSize rlItemSize : rlItemSizes) {
            RlItemSize oldData = this.rlItemSizeRepository.findById(rlItemSize.getSizeNo()).orElseThrow(() -> new RejectedExecutionException("Item size not found for this id: " + rlItemSize.getSizeNo()));
            rlItemSize.setSsCreatedOn(oldData.getSsCreatedOn());
            rlItemSize.setSsModifiedOn(UtillDate.getDateTime());
            saveList.add(this.rlItemSizeRepository.save(rlItemSize));
        }
        return saveList;
    }

    public Map deleteItemSize(Long sizeNo) {
        this.rlItemSizeRepository.findById(sizeNo).orElseThrow(() -> new RejectedExecutionException("Item size not found for this id: " + sizeNo));
        this.rlItemSizeRepository.deleteById(sizeNo);

        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Deleted Successfully");
        return deleteMessage;
    }

    public Map deleteItemSizeList(List<RlItemSize> rlItemSizes) {
        for (RlItemSize rlItemSize : rlItemSizes) {
            this.rlItemSizeRepository.findById(rlItemSize.getSizeNo()).orElseThrow(() -> new RejectedExecutionException("Item size not found for this id: " + rlItemSize.getSizeNo()));
            this.rlItemSizeRepository.deleteById(rlItemSize.getSizeNo());
        }
        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Deleted Successfully");
        return deleteMessage;
    }
}
