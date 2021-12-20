package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.dao.RLProjectDao;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CuProjectService {
  private final RLProjectDao rlProjectDao;

  public CuProjectService(RLProjectDao rlProjectDao) {
    this.rlProjectDao = rlProjectDao;
  }

  public List getProjectList(String projectNo, String projectTypeNo, String projectType, String projectStatus, String regionNo, String subregionNo,String publicFlag) {
    return rlProjectDao.getProjectList(projectNo, projectTypeNo,projectType,projectStatus,regionNo,subregionNo,publicFlag);
  }

  public Map getProjectDetails(String projectNo) {
    return rlProjectDao.getProjectDetails(projectNo);
  }
}
