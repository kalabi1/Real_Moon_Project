package com.nahalit.nahalapimanager.repository;


import com.nahalit.nahalapimanager.model.RlPropertyContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RlPropertyContactRepository extends JpaRepository<RlPropertyContact,Long> {
}
