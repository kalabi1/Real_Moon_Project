package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.SaMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaMenuRepository extends JpaRepository<SaMenu, Long> {
}
