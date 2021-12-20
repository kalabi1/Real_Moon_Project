package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.RlConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RlConfigRepository extends JpaRepository<RlConfig, Long> {
}
