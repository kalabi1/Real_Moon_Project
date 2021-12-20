package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.AcBa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcBaRepository extends JpaRepository<AcBa, Long> {
}
