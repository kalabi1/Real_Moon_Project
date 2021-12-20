package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.RlProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RlProjectRepository extends JpaRepository<RlProject, Long> {
    @Query("SELECT p FROM RlProject p WHERE PROJECT_TYPE_NO = :PROJECT_TYPE_NO")
    List<RlProject> findByProjectCategory(@Param("PROJECT_TYPE_NO") Integer PROJECT_TYPE_NO);
}
