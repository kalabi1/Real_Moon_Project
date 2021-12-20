package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.SaCompanySlider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaCompanySliderRepository extends JpaRepository<SaCompanySlider, Long> {
    @Query("SELECT S FROM SaCompanySlider S WHERE COMPANY_NO=:COMPANY_NO")
    List<SaCompanySlider> getCompanySliderByCompanyNo(@Param("COMPANY_NO") Long companyNo);
}
