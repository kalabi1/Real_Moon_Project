package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class AcVoucherdtl {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "AC_VOUCHERDTL")
    @SequenceGenerator(sequenceName = "S_AC_VOUCHERDTL", allocationSize = 1, name = "AC_VOUCHERDTL")
    private Long vdtlNo;
    private Long vNo;
    private Long accNo;
    private String narration;
    private Double dr;
    private Double cr;
    private String chequeNo;
    private Date chequeDate;
    private String bankName;
    private String bankAccno;
    private Long costNo;
    private Long inBillNo;
    private Integer curNo;
    private Double exchangeRate;
    private Integer voidFlag;
    private Integer allocationFlag;
    private Integer fundDistributionNo;
    private String chkRecNo;
    private Date chkRecDate;
    private Date chkDepDate;
    private Date chkVoidDate;
    private String refNo;
    private Long baNo;
    private Long companyNo;
    private Date ssCreatedOn;
    private Long ssCreator;
    private Date ssModifiedOn;
    private Long ssModifier;
}
