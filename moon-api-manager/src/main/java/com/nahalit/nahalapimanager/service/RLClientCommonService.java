package com.nahalit.nahalapimanager.service;

import com.nahalit.nahalapimanager.model.RlCustomer;
import com.nahalit.nahalapimanager.repository.RlCustomerRepository;
import com.nahalit.nahalapimanager.storage.StorageService;
import org.springframework.stereotype.Service;

@Service
public class RLClientCommonService {
  private final StorageService storageService;
  private final RlCustomerRepository rlCustomerRepository;

  public RLClientCommonService(StorageService storageService, RlCustomerRepository rlCustomerRepository) {
    this.storageService = storageService;
    this.rlCustomerRepository = rlCustomerRepository;
  }

  public RlCustomer customerAuthLogin(String customerId, String password) {
    try {
      return this.rlCustomerRepository.customerAuth(customerId,password);
    } catch (Exception e) {
      return null;
    }
  }
}
