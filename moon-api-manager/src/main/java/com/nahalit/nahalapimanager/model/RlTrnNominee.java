package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
@Getter
@Setter
@Entity
public class RlTrnNominee {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RL_TRN_NOMINEE")
    @SequenceGenerator(sequenceName = "S_RL_TRN_NOMINEE", allocationSize = 1, name = "RL_TRN_NOMINEE")
    private Long nomineeNo;
    private Long trnNo;
    private String nomineeName;
    private String nomineeEmail;
    private String nomineeFatherName;
    private String nomineeMotherName;
    private String relationWithApplicants;
    private String nomineeMobile;
    private String nomineePresentAddress;
    private String nomineePermanentAddress;
    private String nomineePictureName;
    private String nomineeNid;
    private Double percentage;
    private Date nomineeDob;
    private Date ssCreatedOn;
    private Long ssCreator;
    private Date ssModifiedOn;
    private Long ssModifier;
    }
