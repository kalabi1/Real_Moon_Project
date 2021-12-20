package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.SlCustomer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SlCustomerRepository extends JpaRepository<SlCustomer, Long> {
}
