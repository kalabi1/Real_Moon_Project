package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class AcNature {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "AC_NATURE")
    @SequenceGenerator(sequenceName = "S_AC_NATURE", allocationSize = 1, name = "AC_NATURE")
    private Long natureNo;
    private String natureName;
    private String natureCode;
    private String natureType;
    private Integer slNo;
    private Long companyNo;
    private Date ssCreatedOn;
    private Long ssCreator;
    private Date ssModifiedOn;
    private Long ssModifier;
}
