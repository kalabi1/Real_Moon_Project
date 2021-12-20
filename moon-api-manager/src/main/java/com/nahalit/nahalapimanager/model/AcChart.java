package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class AcChart {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "AC_CHART")
    @SequenceGenerator(sequenceName = "S_AC_CHART", allocationSize = 1, name = "AC_CHART")
    private Long accNo;
    private Long parentAccNo;
    private String accName;
    private Long natureNo;
    private String descr;
    private Integer active;
    private String accCode;
    private Integer postFlg;
    private Integer orderSl;
    private Integer costFlg;
    private Integer defaultCurNo;
    private String costSelType;
    private Integer allocationActive;
    private Long buNo;
    private Integer baFlg;
    private String baSelType;
    private String oldAccCode;
    private Integer daySummaryFlag;
    private Integer recurringFlag;
    private Long refAccNo;
    private Long companyNo;
    private Date ssCreatedOn;
    private Long ssCreator;
    private Date ssModifiedOn;
    private Long ssModifier;
}
