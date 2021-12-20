package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.AcNature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcNatureRepository extends JpaRepository<AcNature, Long> {
}
