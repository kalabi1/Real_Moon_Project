package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.SaCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaCompanyRepository extends JpaRepository<SaCompany, Long> {
}
