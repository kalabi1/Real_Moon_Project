package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.RlTrnInstallment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RlTrnInstallmentRepository extends JpaRepository<RlTrnInstallment, Long> {
    @Query("DELETE FROM RlTrnInstallment I WHERE I.trnNo=:TRN_NO AND I.payFlag<>1")
    void deleteByTrnNo(@Param("TRN_NO") Long TRN_NO);

    @Query("SELECT I FROM RlTrnInstallment I WHERE I.trnNo=:TRN_NO ORDER BY I.installmentSl")
    List selectAllByTrnNo(@Param("TRN_NO") Long TRN_NO);
}
