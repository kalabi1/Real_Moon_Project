package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class SlCustomer {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SL_CUSTOMER")
  @SequenceGenerator(sequenceName = "S_SL_CUSTOMER", allocationSize = 1, name = "SL_CUSTOMER")
  private Long customerNo;
  private String customerId;
  private String customer;
  private Integer opBalance;
  private Date opDate;
  private String companyName;
  private String descr;
  private String addr1;
  private String addr2;
  private String phone1;
  private String phone2;
  private String fax;
  private String email;
  private String website;
  private String cp;
  private String cpPhone;
  private String cpJobtitle;
  private String remarks;
  private Integer activeStat;
  private Long ssCreator;
  private Date ssCreatedOn;
  private Long ssModifier;
  private Date ssModifiedOn;
  private String mobile;
  private String address;
  private String mobile2;
  private Long customerType;
  private String ircNo;
  private String tinNo;
  private String binVat;
  private String ercNo;
  private Long companyNo;
}
