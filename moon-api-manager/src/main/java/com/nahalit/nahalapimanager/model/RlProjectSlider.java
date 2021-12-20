package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
@Entity
public class RlProjectSlider {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rl_project_slider")
  @SequenceGenerator(sequenceName = "s_rl_project_slider", allocationSize = 1, name = "rl_project_slider")
  private Long sliderNo;
  private String imageName;
  @NotNull
  private Long projectNo;
  private Long ssCreator;
  private Date ssCreatedOn;
  private Long ssModifier;
  private Date ssModifiedOn;
}
