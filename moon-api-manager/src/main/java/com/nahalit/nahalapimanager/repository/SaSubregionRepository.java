package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.SaSubregion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaSubregionRepository extends JpaRepository<SaSubregion, Long> {
    @Query("SELECT S FROM SaSubregion S WHERE S.regionNo=:REGION_NO")
    List<SaSubregion> findAllByRegionNo(@Param("REGION_NO") Long REGION_NO);
}
