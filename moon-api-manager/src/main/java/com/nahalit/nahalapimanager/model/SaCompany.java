package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
public class SaCompany {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SA_COMPANY")
  @SequenceGenerator(sequenceName = "S_SA_COMPANY", allocationSize = 1, name = "SA_COMPANY")
  private Long companyNo;
  private String companyId;
  private String companyName;
  private String companyNameBangla;
  private String companyAlias;
  private String companyAliasBangla;
  private String companySlogan;
  private String companyAddr1;
  private String companyAddr2;
  private String companyAdd1_Bangla;
  private String companyAdd2_Bangla;
  private String companyCountry;
  private String companyMobile;
  private String companyPhone;
  private String companyFax;
  private String companyEmail;
  private String companyWebsite;
  private String companyLogo;
  private String companyLogoName;
  private String companyFaviconName;
  private String companyDeveloper;
  private String repFooter1;
  private String repFooter2;
  private String repFooterDev;
  private String tinNo;
  private String vatRegNo;
  private String ercNo;
  private String ercDate;
  private String ircNo;
  private String licenseNo;
  private String companyLogoWeburl;
  private String companyLatestNews;
  private String officeTime;
  private Integer groupFlag;
  private Integer activeStat;
  private String office1Address;
  private String office1TelephoneNo;
  private String office1MobileNo;
  private String office1Email;
  private String office2Address;
  private String office2TelephoneNo;
  private String office2MobileNo;
  private String office2Email;
  private String office3Address;
  private String office3TelephoneNo;
  private String office3MobileNo;
  private String office3Email;
  private String office1AddrName;
  private String office2AddrName;
  private String office3AddrName;
  private Long ssCompanyNo;
  private Long ssCreator;
  private Date ssCreatedOn;
  private Long ssModifier;
  private Date ssModifiedOn;
}
