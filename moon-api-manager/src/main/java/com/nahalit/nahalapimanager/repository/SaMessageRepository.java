package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.SaMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SaMessageRepository extends JpaRepository<SaMessage, Long> {
    @Query("SELECT M FROM SaMessage M WHERE M.messageType=:messageType")
    SaMessage findMessageByMessageType(@Param("messageType") String messageType);

}
