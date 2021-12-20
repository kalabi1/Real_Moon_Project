package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.RlProjectSlider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RlProjectSliderRepository extends JpaRepository<RlProjectSlider, Long> {
  @Query("SELECT S FROM RlProjectSlider S WHERE PROJECT_NO=:PROJECT_NO")
  List<RlProjectSlider> findAllByProjectNo(@Param("PROJECT_NO") Long PROJECT_NO);
}
