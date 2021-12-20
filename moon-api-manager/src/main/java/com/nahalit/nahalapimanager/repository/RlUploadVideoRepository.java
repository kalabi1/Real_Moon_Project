package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.RlUploadVideo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RlUploadVideoRepository extends JpaRepository<RlUploadVideo, Long> {
    @Query("SELECT V FROM RlUploadVideo V WHERE ITEM_NO=:ITEM_NO")
    List<RlUploadVideo> findAllByItemNo(@Param("ITEM_NO") Long ITEM_NO);

    @Query("SELECT V FROM RlUploadVideo V WHERE PROJECT_NO=:PROJECT_NO")
    List<RlUploadVideo> findAllByProjectNo(@Param("PROJECT_NO") Long PROJECT_NO);
}
