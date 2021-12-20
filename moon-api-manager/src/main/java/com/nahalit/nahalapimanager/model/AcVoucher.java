package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class AcVoucher {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "AC_VOUCHER")
    @SequenceGenerator(sequenceName = "S_AC_VOUCHER", allocationSize = 1, name = "AC_VOUCHER")
    private Long vNo;
    private String vId;
    private Integer vtypeNo;
    private Date vDate;
    private String narration;
    private Integer postFlag;
    private Integer opPeriodno;
    private String module;
    private String voidFlag;
    private Integer checkFlag;
    private Integer checkBy;
    private Date checkDate;
    private Integer postBy;
    private Date postDate;
    private String attachFileName;
    private Long paidTo;
    private Long receiveFrom;
    private Long companyNo;
    private Date ssCreatedOn;
    private Long ssCreator;
    private Date ssModifiedOn;
    private Long ssModifier;
}
