package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
@Entity
public class RlRajukApproval {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RL_RAJUK")
    @SequenceGenerator(sequenceName = "S_RL_RAJUK_APPROVAL", allocationSize = 1, name = "RL_RAJUK")
    private Long approvalNo;
    @NotNull
    private String approvalId;
    private String descr;
    private Long ssCreator;
    private Date ssCreatedOn;
    private Long ssModifier;
    private Date ssModifiedOn;
}
