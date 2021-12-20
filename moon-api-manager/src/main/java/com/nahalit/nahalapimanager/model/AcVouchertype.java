package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;


@Getter
@Setter
@Entity
public class AcVouchertype {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "AC_VOUCHERTYPE")
    @SequenceGenerator(sequenceName = "S_AC_VOUCHERTYPE", allocationSize = 1, name = "AC_VOUCHERTYPE")
    private Long vtypeNo;
    private String typeName;
    private String alias;
    private String vType;
    private String descr;
    private Integer autogenFlag;
    private String genType;
    private Integer genFlag;
    private Integer vDefault;
    private Long companyNo;
    private Date ssCreatedOn;
    private Long ssCreator;
    private Date ssModifiedOn;
    private Long ssModifier;

}
