package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.dao.AC1011Dao;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;

@Service
public class AC1011Service {
    private final AC1011Dao ac1011Dao;


    public AC1011Service(AC1011Dao ac1011Dao) {
        this.ac1011Dao = ac1011Dao;
    }

    public List getAccBalanceList() throws ParseException {

        return ac1011Dao.getAccBalanceList();
    }

}
