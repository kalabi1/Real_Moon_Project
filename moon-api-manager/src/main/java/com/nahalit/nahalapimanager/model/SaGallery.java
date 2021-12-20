package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class SaGallery {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SA_GALLERY")
    @SequenceGenerator(sequenceName = "S_SA_GALLERY", allocationSize = 1, name = "SA_GALLERY")
    private Long galleryNo;
    private String galleryTitle;
    private String galleryDescr;
    private String galleryPhotoName;
    private String galleryThumbName;
    private Integer slNo;
    private Integer activeStat;
    private Integer companyNo;
    private Long ssCreator;
    private Date ssCreatedOn;
    private Long ssModifier;
    private Date ssModifiedOn;
}

