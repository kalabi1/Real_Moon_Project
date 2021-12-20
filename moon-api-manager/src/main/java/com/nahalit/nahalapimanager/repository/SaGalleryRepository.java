package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.SaGallery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaGalleryRepository extends JpaRepository<SaGallery, Long> {
}
