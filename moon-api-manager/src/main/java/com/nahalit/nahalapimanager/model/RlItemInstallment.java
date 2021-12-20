package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class RlItemInstallment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rl_item_installment")
    @SequenceGenerator(sequenceName = "S_RL_ITEM_INSTALLMENT", allocationSize = 1, name = "rl_item_installment")
    private Long installmentNo;
    private int installmentAmount;
    private Long itemNo;
    private Long ssCreator;
    private Date ssCreatedOn;
    private Long ssModifier;
    private Date ssModifiedOn;
}
