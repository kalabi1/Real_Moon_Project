package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.RlItemInstallment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RlItemInstallmentRepository extends JpaRepository<RlItemInstallment, Long> {
    @Query("SELECT I FROM RlItemInstallment I where ITEM_NO=:ITEM_NO ORDER BY INSTALLMENT_AMOUNT")
    List<RlItemInstallment> findAllByItemNo(@Param("ITEM_NO") Long ITEM_NO);
}
