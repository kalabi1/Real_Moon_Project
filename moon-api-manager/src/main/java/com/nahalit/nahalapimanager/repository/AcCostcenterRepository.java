package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.AcCostcenter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcCostcenterRepository extends JpaRepository<AcCostcenter, Long> {
}
