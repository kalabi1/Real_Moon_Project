package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.RlItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RlItemRepository extends JpaRepository<RlItem, Long> {
    @Query("SELECT I FROM RlItem I WHERE ITEM_TYPE_NO=:ITEM_TYPE_NO")
    List<RlItem> findAllByItemType(@Param("ITEM_TYPE_NO") Long ITEM_TYPE_NO);

    @Query("SELECT I FROM RlItem  I WHERE ITEM_NO=:ITEM_NO AND ITEM_TYPE_NO=:ITEM_TYPE_NO")
    RlItem findItemByIdAndType(@Param("ITEM_NO") Long ITEM_NO, @Param("ITEM_TYPE_NO") Long ITEM_TYPE_NO);
}
