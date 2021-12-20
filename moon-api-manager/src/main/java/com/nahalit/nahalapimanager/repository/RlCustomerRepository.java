package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.RlCustomer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface RlCustomerRepository extends JpaRepository<RlCustomer, Long> {
  @Query("SELECT C FROM RlCustomer C " +
      "where (CUSTOMER_ID=:CUSTOMER_ID and PASSWORD=:PASSWORD)" +
      "or (MOBILE=:CUSTOMER_ID and PASSWORD=:PASSWORD)" +
      "or (EMAIL=:CUSTOMER_ID and PASSWORD=:PASSWORD)")
  RlCustomer customerAuth(@Param("CUSTOMER_ID") String CUSTOMER_ID, @Param("PASSWORD") String PASSWORD);
}
