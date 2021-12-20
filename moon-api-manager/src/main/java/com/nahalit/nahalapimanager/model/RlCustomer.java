package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.Date;

//@Table(name = "RlCustomer")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class RlCustomer {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CUST_SEQ")
  @SequenceGenerator(sequenceName = "S_RL_CUSTOMER", allocationSize = 1, name = "CUST_SEQ")
  private Long customerNo;
  @Column(unique = true)
  private String customerId;
  //  @Size(max = 65)
//  @Column(name = "first_name")
//@Email
  @NotNull
  private String customerName;
  private String fatherName;
  private String motherName;
  private String spouseName;
  private String permanentAddress;
  private String presentAddress;
  private String dob;
  private String religion;
  private String nid;
  private String nationality;
  private String telephone;
  private String mobile;
  private String cpMobile;
  @Email
  private String email;
  private String contactPerson;
  private Long profession_no;
  private String designation;
  private String officeAddress;
  private String customerPictureName;
  private Long companyNo;
  private String password;
  private String religionName;
  private String cpAddress;
  private String cpEmail;
  private Long ssCreator;
  private Date ssCreatedOn;
  private Long ssModifier;
  private Date ssModifiedOn;
}
