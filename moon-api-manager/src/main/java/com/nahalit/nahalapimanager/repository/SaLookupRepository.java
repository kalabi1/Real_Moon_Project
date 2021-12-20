package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.SaLookup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaLookupRepository extends JpaRepository<SaLookup, Long> {

}
