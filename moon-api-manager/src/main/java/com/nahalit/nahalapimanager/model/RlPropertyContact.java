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
public class RlPropertyContact {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RL_PROPERTY_CONTACT")
  @SequenceGenerator(sequenceName = "S_RL_PROPERTY_CONTACT", allocationSize = 1, name = "RL_PROPERTY_CONTACT")
  private Long contactNo;
  private Long itemNo;
  private String cpName;
  private String cpEmail;
  private String cpMobile;
  private String cpComments;
  private Date contactDate;
  private Integer readFlag;

}
