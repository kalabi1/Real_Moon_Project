package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class RlConfig {
    @Id
    private Long sl;
    private Integer displayFeatureListNumber;
    private String contactMailSendTo;
    private String contactMailSendCc;
    private String contactMailSendBcc;
}
