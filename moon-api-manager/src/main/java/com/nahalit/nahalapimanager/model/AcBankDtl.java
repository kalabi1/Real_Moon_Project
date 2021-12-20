package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class AcBankDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "AC_BANKDTL")
    @SequenceGenerator(sequenceName = "S_AC_BANKDTL", allocationSize = 1, name = "AC_BANKDTL")
    private Long bankdtlNo;
    private Long bankNo;
    private Long accNo;
    private String bankAccNo;
    private String bankAccType;
    private String branchName;
    private Long subbankOf;
    private Double bankOpenBalance;
    private Integer salesAccNo;
    private Integer checkBook;
    private Integer lcAdvising;
    private Long companyNo;
    private Date ssCreatedOn;
    private Long ssCreator;
    private Date ssModifiedOn;
    private Long ssModifier;
}
