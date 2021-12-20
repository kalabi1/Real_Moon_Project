package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.AcVouchertype;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcVouchertypeRepository extends JpaRepository<AcVouchertype, Long> {
}
