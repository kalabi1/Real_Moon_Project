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
public class RlPlotPosition {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RL_PLOT_POSITION")
  @SequenceGenerator(sequenceName = "S_RL_PLOT_POSITION", allocationSize = 1, name = "RL_PLOT_POSITION")
  private Long positionNo;
  private String positionName;
  private Long companyNo;
  private Long ssCreator;
  private Date ssCreatedOn;
  private Long ssModifier;
  private Date ssModifiedOn;

}
