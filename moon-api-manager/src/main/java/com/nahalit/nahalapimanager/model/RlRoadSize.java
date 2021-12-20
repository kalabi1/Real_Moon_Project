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
public class RlRoadSize {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RL_ROAD_SIZE")
  @SequenceGenerator(sequenceName = "S_RL_ROAD_SIZE", allocationSize = 1, name = "RL_ROAD_SIZE")
  private Long sizeNo;
  private Long roadSize;
  private Long activeFlag;
  private Long companyNo;
  private Long ssCreator;
  private Date ssCreatedOn;
  private Long ssModifier;
  private Date ssModifiedOn;
}
