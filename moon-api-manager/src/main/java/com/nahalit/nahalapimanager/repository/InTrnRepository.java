package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.InTrn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InTrnRepository extends JpaRepository<InTrn, Long> {
}
