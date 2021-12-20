package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
@Getter
@Setter
@Entity
public class RlCollection {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RL_COLLECTION")
    @SequenceGenerator(sequenceName = "S_RL_COLLECTION", allocationSize = 1, name = "RL_COLLECTION")
    private Long collNo;
    private Long trnNo;
    private String collId;
    private Date collDate;
    private Long customerNo;
    private Long installmentNo;
    private Double paidAmount;
    private String descr;
    private String payMode;
    private String bankNo;
    private String branchNo;
    private Date cqDate;
    private String cqNo;
    private String mrNo;
    private String refTrnNo;
    private Date ssCreatedOn;
    private Long ssCreator;
    private Date ssModifiedOn;
    private Long ssModifier;
}
