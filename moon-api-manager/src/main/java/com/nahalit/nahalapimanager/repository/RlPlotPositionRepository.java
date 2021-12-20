package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.RlPlotPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RlPlotPositionRepository extends JpaRepository<RlPlotPosition,Long> {
}
