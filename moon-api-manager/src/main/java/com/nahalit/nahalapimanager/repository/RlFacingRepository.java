package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.RlFacing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RlFacingRepository extends JpaRepository<RlFacing, Long> {
}
