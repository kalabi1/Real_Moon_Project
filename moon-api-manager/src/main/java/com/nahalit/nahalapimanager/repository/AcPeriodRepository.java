package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.AcPeriod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcPeriodRepository extends JpaRepository<AcPeriod, Long> {
}
