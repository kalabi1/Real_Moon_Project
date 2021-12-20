package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.dao.AC1006Dao;
import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;
import com.nahalit.nahalapimanager.model.AcChart;
import com.nahalit.nahalapimanager.repository.AcChartRepository;
import com.nahalit.nahalapimanager.utillibrary.UtillDate;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.RejectedExecutionException;

@Service
public class AC1006Service {
    private final AcChartRepository acChartRepository;
    private final AC1006Dao ac1006Dao;
    private final AuthService authService;

    public AC1006Service(AcChartRepository acChartRepository, AC1006Dao ac1006Dao, AuthService authService) {
        this.acChartRepository = acChartRepository;
        this.ac1006Dao = ac1006Dao;
        this.authService = authService;
    }

    // Ac Nature
    public List<AcChart> getAllAcChart() {
        return this.acChartRepository.findAll();
    }

    public AcChart getAcChart(Long accNo) throws ResourceNotFoundException {
        return this.acChartRepository.findById(accNo).orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id:" + accNo));
    }

    public AcChart saveAcChart(AcChart acChart) throws ParseException {
        acChart.setSsCreatedOn(UtillDate.getDateTime());
        acChart.setSsModifiedOn(null);
        acChart.setSsCreator(authService.getUserNo());
        acChart.setCompanyNo(authService.getCompanyNo());
        return this.acChartRepository.save(acChart);
    }

    public List<AcChart> saveAcChartList(List<AcChart> acChartList) {
        return this.acChartRepository.saveAll(acChartList);
    }

    public AcChart updateAcChart(AcChart acChart) throws ResourceNotFoundException, ParseException {
        AcChart oldData = this.acChartRepository.findById(acChart.getAccNo()).orElseThrow(() -> new ResourceNotFoundException("Transaction not for this:" + acChart.getAccNo()));
        acChart.setSsModifiedOn(UtillDate.getDateTime());
        acChart.setSsCreatedOn(oldData.getSsCreatedOn());
        acChart.setSsModifier(authService.getUserNo());
        acChart.setSsCreator(oldData.getSsCreator());
        acChart.setCompanyNo(oldData.getCompanyNo());
        return this.acChartRepository.save(acChart);
    }

    public Map deleteAcChart(Long accNo) {

        this.acChartRepository.findById(accNo).orElseThrow(() -> new RejectedExecutionException("Transaction not found for this id: " + accNo));

        this.acChartRepository.deleteById(accNo);
        Map<String, String> deleteMessage = new HashMap<>();
        deleteMessage.put("deleteStatus", "Transaction Deleted Successfully");
        return deleteMessage;
    }

    public List getAccTreeList() {
      return this.ac1006Dao.getAccTreeList();
    }

}
