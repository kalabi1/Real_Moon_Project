package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class RlItem {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rl_item")
  @SequenceGenerator(sequenceName = "s_rl_item", allocationSize = 1, name = "rl_item")
  private Long itemNo;
  private String itemId;
  private String itemName;
  private String descr;
  private String descrBn;
  private Long projectNo;
  private Long plotType;
  private String roadSize;
  private Long facingNo;
  private String blockName;
  private Double plotSize;
  private Double price;
  private Double totalPrice;
  private Double flatSize;
  private Long flatPlaceofStorid;
  private Long flatNo;
  private Long numberOfLift;
  private String decorationCondition;
  private Long bedRoom;
  private Long livingAndDining;
  private Long kitchen;
  private Long toilets;
  private Long swimmingPool;
  private Long gym;
  private Long parkingFlag;
  private Double parkingPrice;
  private Long itemTypeNo;
  private String flatType;
  private Integer itemInventoryFlag;
  private Integer numberOfBalcony;
  private Integer inactiveFlag;
  private Integer securityFlag;
  private Integer cctvFlag;
  private Integer conferenceHallFlag;
  private Integer heatingFlag;
  private Integer coolingFlag;
  private Integer builtYear;
  private Integer discountAmount;
  private Integer internetFlag;
  private Integer cableTvFlag;
  private String itemBrandPhoto;
  private Double discountPct;
  private Double netPrice;
  private String termsAndCondition;
  private String termsAndConditionBn;
  private Integer plotNo;
  private Integer publishFlag;
  private Integer uomNo;
  private Integer roadSide;
  private Integer positionNo;
  private Integer roadNo;
  private Integer priceNegotiableFlag;
  private Double bookingMoney;
  private String others;
  private Date ssCreatedOn;
  private Long ssCreator;
  private Date ssModifiedOn;
  private Long ssModifier;
}
