package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
@Entity
public class SaLookupdtl {
  @Id
  private Long lookupdtlNo;
  private Long lookupNo;
  @NotNull
  private String dtlName;
  private String descr;
  private Long activeStat;
  private Long LookupdtlNoParent;
  private String shortName;
  private String nls_name;
  private Long ssCreator;
  private Date ssCreatedOn;
  private Long ssModifier;
  private Date ssModifiedOn;

}
