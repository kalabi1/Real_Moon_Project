package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
public class InItem {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IN_ITEM")
  @SequenceGenerator(sequenceName = "S_IN_ITEM", allocationSize = 1, name = "IN_ITEM")
  private Long itemNo;
  private String itemId;
  private String itemName;
  private String descr;
  private Long uomNo;
  private Long catNo;
  private Long brandNo;
  private Integer activeStat;
  private Long subitemOf;
  private Date ssCreatedOn;
  private Long ssCreator;
  private Date ssModifiedOn;
  private Long ssModifier;
  private Integer groupFlag;
  private String origin;
  private Integer minLevel;
  private Integer maxLevel;
  private String color;
  private Double unitPrice;
  private Double mrp;
  private Double salePrice;
  private Date priceUpdateDate;
  private Long itemTypeNo;
  private Integer slNo;
  private Integer vatPercent;


}
