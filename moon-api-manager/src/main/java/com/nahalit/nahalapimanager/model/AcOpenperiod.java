package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class AcOpenperiod {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "AC_OPENPERIOD")
    @SequenceGenerator(sequenceName = "S_AC_OPENPERIOD", allocationSize = 1, name = "AC_OPENPERIOD")
    private Long periodNo;
    private Long accNo;
    private Date startPeriodDate;
    private Date endPeriodDate;
    private Date openDate;
    private Double dr;
    private Double cr;
    private Date closeDate;
    private Double clDr;
    private Double clCr;
    private Long costNo;
    private Long baNo;
    private Long openperiodNo;
    private Integer processBySystemFlag;
    private String descr;
    private Long companyNo;
    private Date ssCreatedOn;
    private Long ssCreator;
    private Date ssModifiedOn;
    private Long ssModifier;
}
