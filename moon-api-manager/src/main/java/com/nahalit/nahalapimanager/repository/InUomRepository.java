package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.InUom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InUomRepository extends JpaRepository<InUom, Long> {
}
