package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.RlRajukApproval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RlRajukApprovalRepository extends JpaRepository<RlRajukApproval,Long> {
}
