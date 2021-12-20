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
public class RlFacing {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rl_item_facing")
  @SequenceGenerator(sequenceName = "s_rl_facing", allocationSize = 1, name = "rl_item_facing")
  private Long facingNo;
  private String facingName;
  private Long companyNo;
  private Long ssCreator;
  private Date ssCreatedOn;
  private Long ssModifier;
  private Date ssModifiedOn;

}
