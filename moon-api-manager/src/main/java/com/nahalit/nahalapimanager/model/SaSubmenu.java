package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class SaSubmenu {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SA_SUBMENU")
    @SequenceGenerator(sequenceName = "S_SA_SUBMENU", allocationSize = 1, name = "SA_SUBMENU")
    private Long submenuNo;
    private String submenuId;
    private Integer menuNo;
    private String submenuNameUser;
    private String submenuType;
    private Integer canView;
    private Integer canModify;
    private Integer canRemove;
    private Integer canCreate;
    private Integer activeStat;
    private String descr;
    private String submenuNameSys;
    private Integer paraSubmenuNo;
    private Integer slNo;
    private String submenuName;
    private String submenuNameNls;
    private Integer appsFlag;
    private Integer hideFromMenu;
    private String reportFormat;
    private String defReportServer;
    private String rpOutput;
    private Integer myDesk;
    private Integer webErpFlag;
    private Long ssCreator;
    private Date ssCreatedOn;
    private Long ssModifier;
    private Date ssModifiedOn;

}
