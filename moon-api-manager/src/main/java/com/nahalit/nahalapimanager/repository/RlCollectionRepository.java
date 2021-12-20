package com.nahalit.nahalapimanager.repository;


import com.nahalit.nahalapimanager.model.RlCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RlCollectionRepository extends JpaRepository<RlCollection, Long> {
}
