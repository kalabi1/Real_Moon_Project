package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.AcOpenperiod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcOpenperiodRepository extends JpaRepository<AcOpenperiod, Long> {
}
