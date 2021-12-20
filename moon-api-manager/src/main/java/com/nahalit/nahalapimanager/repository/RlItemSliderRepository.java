package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.RlItemSlider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RlItemSliderRepository extends JpaRepository<RlItemSlider, Long> {
    @Query("SELECT S FROM RlItemSlider S WHERE ITEM_NO=:ITEM_NO")
    List<RlItemSlider> findAllByItemNo(@Param("ITEM_NO") Long ITEM_NO);
}
