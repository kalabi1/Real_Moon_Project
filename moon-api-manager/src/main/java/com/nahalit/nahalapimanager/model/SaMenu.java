package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@Entity
public class SaMenu {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SA_MENU")
    @SequenceGenerator(sequenceName = "S_SA_MENU", allocationSize = 1, name = "SA_MENU")
    private Long menuNo;
    @UniqueElements
    @NotNull
    private String menuId;
    private String menuName;
    private String descr;
    private Integer parentMenuNo;
    private Integer slNo;
    private Integer activeStat;
    private Integer companyNo;
    private String menuNameNls;
    private Integer webErpFlag;
    private Long ssCreator;
    private Date ssCreatedOn;
    private Long ssModifier;
    private Date ssModifiedOn;
}
