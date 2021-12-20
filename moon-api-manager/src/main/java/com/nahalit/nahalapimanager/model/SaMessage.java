package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class SaMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SA_MESSAGE")
    @SequenceGenerator(sequenceName = "S_SA_MESSAGE", allocationSize = 1, name = "SA_MESSAGE")
    private Long messageNo;
    private String messageType;
    private String message;
    private String messengerName;
    private String messengerDesig;
    private String messengerPhotoName;
    private Integer activeFlag;
    private Integer companyNo;
    private Long ssCreator;
    private Date ssCreatedOn;
    private Long ssModifier;
    private Date ssModifiedOn;
}

