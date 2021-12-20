package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class InTrn {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IN_TRN")
  @SequenceGenerator(sequenceName = "S_IN_TRN", allocationSize = 1, name = "IN_TRN")
  private Long trnNo;
  private String trnId;
  private Date trnDate;
  private Long trntypeNo;
  private Long supplierNo;
  private Long customerNo;
  private Integer postFlag;
  private String receiptNo;
  private String challanNote;
  private String descr;
  private Integer postedBy;
  private Date postDate;
  private Integer totalPayable;
  private Integer netPayable;
  private Integer tradeDiscount;
  private Double lessAmount;
  private Double dueAmount;
  private Long ssCreator;
  private Long ssModifier;
  private String payMode;
  private Double paidAmount;
  private Long payNo;
  private Date ssCreatedOn;
  private Date ssModifiedOn;
  private Integer issuedFlag;
  private Integer rcvFlag;
  private Long refTrnNo;
  private String address;
  private Long woNo;
}
