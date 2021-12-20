package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.InItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InItemRepository extends JpaRepository<InItem, Long> {
}
