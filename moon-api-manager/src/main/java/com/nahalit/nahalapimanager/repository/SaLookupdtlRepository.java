package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.SaLookupdtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaLookupdtlRepository extends JpaRepository<SaLookupdtl, Long> {
  @Query("SELECT L FROM SaLookupdtl L WHERE LOOKUP_NO=:LOOKUP_NO")
  List<SaLookupdtl> findAllByLookupNo(@Param("LOOKUP_NO") Long LOOKUP_NO);
}
