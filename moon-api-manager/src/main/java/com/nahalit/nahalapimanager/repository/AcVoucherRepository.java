package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.AcVoucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcVoucherRepository extends JpaRepository<AcVoucher, Long> {
}
