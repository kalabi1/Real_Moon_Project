package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.SaRegion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaRegionRepository extends JpaRepository<SaRegion, Long> {
}
