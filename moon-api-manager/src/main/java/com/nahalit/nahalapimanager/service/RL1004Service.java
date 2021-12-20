package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.dao.RL1004Dao;
import com.nahalit.nahalapimanager.dao.RLProjectDao;
import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.RlProject;
import com.nahalit.nahalapimanager.repository.RlProjectRepository;
import com.nahalit.nahalapimanager.storage.StorageService;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.RejectedExecutionException;

@Service
public class RL1004Service {
  private final RlProjectRepository rlProjectRepository;
  private final RL1004Dao rl1004Dao;
  private final RLProjectDao rlProjectDao;
  private final StorageService storageService;


  public RL1004Service(RlProjectRepository rlProjectRepository, RL1004Dao rl1004Dao, RLProjectDao rlProjectDao, StorageService storageService) {
    this.rlProjectRepository = rlProjectRepository;
    this.rl1004Dao = rl1004Dao;
    this.rlProjectDao = rlProjectDao;
    this.storageService = storageService;
  }

  // RL Land Project Service
  public List getAllProject(Long projectNo) throws ResourceNotFoundException {
//    if (projectNo != null) {
//     return (List) this.rlProjectRepository.findById(projectNo).orElseThrow(() -> new ResourceNotFoundException("Land Project not found for this id:" + projectNo));
//    } else{
//      return this.rlProjectRepository.findByProjectCategory(1);
//    }
    return this.rlProjectDao.getProjectList(projectNo!=null?""+projectNo:"",""+1,"","","","","");
//    return this.rl1004Dao.getAllProjectRef(projectNo);
  }

  public Object getProject(Long projectNo) throws ResourceNotFoundException {
    this.rlProjectRepository.findById(projectNo).orElseThrow(() -> new ResourceNotFoundException("Land Project not found for this id:" + projectNo));
//    return rl1004Dao.getProjectRef(projectNo);
    return rlProjectDao.getProjectDetails("" + projectNo);
  }

  public RlProject saveRlProject(RlProject rlProject) throws ParseException {
    rlProject.setSsCreatedOn(UtillDate.getDateTime());
    rlProject.setSsModifiedOn(null);
    rlProject.setProjectTypeNo(1);
    rlProject.setProjectId(rlProjectDao.getProjectId("1"));
    return this.rlProjectRepository.save(rlProject);
  }

  public RlProject updateRlProject(RlProject rlProject) throws ResourceNotFoundException, ParseException, IOException {
    RlProject oldData = this.rlProjectRepository.findById(rlProject.getProjectNo()).orElseThrow(() -> new ResourceNotFoundException("Land Project not for this:" + rlProject.getProjectNo()));
    if (oldData.getProjectLayoutPhoto() != null && rlProject.getProjectLayoutPhoto() != null && !oldData.getProjectLayoutPhoto().equalsIgnoreCase(rlProject.getProjectLayoutPhoto())) {
      this.storageService.deleteFile(oldData.getProjectLayoutPhoto());
    }
    rlProject.setSsCreatedOn(oldData.getSsCreatedOn());
    rlProject.setSsModifiedOn(UtillDate.getDateTime());
    return this.rlProjectRepository.save(rlProject);
  }

  public Map deleteRlProject(Long projectNo) throws IOException {
  RlProject rlProject=  this.rlProjectRepository.findById(projectNo).orElseThrow(() -> new RejectedExecutionException("Land Project not found for this id: " + projectNo));
    this.rlProjectRepository.deleteById(projectNo);
    this.storageService.deleteFile(rlProject.getProjectLayoutPhoto());
    Map<String, String> deleteMessage = new HashMap<>();
    deleteMessage.put("deleteStatus", "Deleted Successfully");
    return deleteMessage;
  }
}
