package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.AcBank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcBankRepository extends JpaRepository<AcBank, Long> {
}
