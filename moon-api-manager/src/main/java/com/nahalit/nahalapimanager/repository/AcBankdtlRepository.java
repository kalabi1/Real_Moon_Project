package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.AcBankDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcBankdtlRepository extends JpaRepository<AcBankDtl, Long> {
}
