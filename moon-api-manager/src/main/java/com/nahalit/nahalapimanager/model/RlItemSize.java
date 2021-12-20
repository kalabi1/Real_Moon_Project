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
public class RlItemSize {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rl_item_size")
  @SequenceGenerator(sequenceName = "s_rl_item_size", allocationSize = 1, name = "rl_item_size")
  private Long sizeNo;
  private Long projectNo;
  private String flatType;
  private Double flatSize;
  private Long ssCreator;
  private Date ssCreatedOn;
  private Long ssModifier;
  private Date ssModifiedOn;
}
