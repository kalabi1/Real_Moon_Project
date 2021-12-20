package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.SaSubmenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaSubmenuRepository extends JpaRepository<SaSubmenu, Long> {
}
