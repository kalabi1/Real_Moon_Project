package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.RlTrn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RlTrnRepository extends JpaRepository<RlTrn, Long> {
}
