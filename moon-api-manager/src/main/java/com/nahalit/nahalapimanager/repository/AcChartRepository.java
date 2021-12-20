package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.AcChart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcChartRepository extends JpaRepository<AcChart, Long> {
}
