package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class InTrndtl {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IN_TRN")
  @SequenceGenerator(sequenceName = "S_IN_TRN", allocationSize = 1, name = "IN_TRN")
  private Long trndtlNo;
  private Long trnNo;
  private Long itemNo;
  private Integer isuQty;
  private Integer rcvQty;
  private Long uomNo;
  private Double unitPrice;
  private Double mrp;
  private Double salePrice;
  private Long ssCreator;
  private Long ssModifier;
  private Date ssCreatedOn;
  private Date ssModifiedOn;
  private Long wodtlNo;

}
