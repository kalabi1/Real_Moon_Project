package com.nahalit.nahalapimanager.repository;

import com.nahalit.nahalapimanager.model.RlTrnNominee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RlTrnNomineeRepository extends JpaRepository<RlTrnNominee, Long> {
    @Query("SELECT N FROM RlTrnNominee N WHERE N.trnNo=:TRN_NO")
    RlTrnNominee getNomineeByTrnNo(@Param("TRN_NO") Long TRN_NO);

    @Query("DELETE FROM RlTrnNominee N WHERE N.trnNo=:TRN_NO")
    void deleteNomineeByTrnNo(@Param("TRN_NO") Long TRN_NO);
}
