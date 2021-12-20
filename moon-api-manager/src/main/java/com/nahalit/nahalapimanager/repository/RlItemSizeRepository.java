package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.RlItemSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface RlItemSizeRepository extends JpaRepository<RlItemSize, Long> {
  @Query("SELECT S FROM RlItemSize S WHERE PROJECT_NO=:PROJECT_NO")
  List<RlItemSize> getAllByProjectNo(@RequestParam("PROJECT_NO") Long PROJECT_NO);
}
