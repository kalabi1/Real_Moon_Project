package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
@Entity
public class SaCompanySlider {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "COMPANY_SLIDER")
    @SequenceGenerator(sequenceName = "S_SA_COMPANY_SLIDER", allocationSize = 1, name = "COMPANY_SLIDER")
    private Long sliderNo;
    private String sliderName;
    private Long companyNo;
    private Long ssCreator;
    private Date ssCreatedOn;
    private Long ssModifier;
    private Date ssModifiedOn;
}

