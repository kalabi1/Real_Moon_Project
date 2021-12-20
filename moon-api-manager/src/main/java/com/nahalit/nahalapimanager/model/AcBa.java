package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class AcBa {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "AC_BA")
    @SequenceGenerator(sequenceName = "S_AC_BA", allocationSize = 1, name = "AC_BA")
    private Long baNo;
    private Long baNoParent;
    private String baName;
    private String descr;
    private Integer inactiveStat;
    private Integer masterBaFlag;
    private Long companyNo;
    private Date ssCreatedOn;
    private Long ssCreator;
    private Date ssModifiedOn;
    private Long ssModifier;
}
