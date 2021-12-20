package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.InTrndtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InTrndtlRepository extends JpaRepository<InTrndtl, Long> {
  @Query("SELECT T FROM InTrndtl T WHERE T.trnNo=:TRN_NO")
  List<InTrndtl> getAllTrnByTrnNo(@Param("TRN_NO") Long TRN_NO);
}
