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
public class RlTrn {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RL_TRN")
    @SequenceGenerator(sequenceName = "S_RL_TRN", allocationSize = 1, name = "RL_TRN")
    private Long trnNo;
    private String trnId;
    private Date trnDate;
    private Long itemNo;
    private Long customerNo;
    private Double totalPrice;
    private Double specialDiscountPct;
    private Double specialDiscountAmt;
    private Double settlementPrice;
    private String bookingRefPerson;
    private String refContactNo;
    private String paymentType;
    private Double bookingAmount;
    private String paymentMode;
    private String chequeNo;
    private String ddNo;
    private String ttNo;
    private Date chequeDate;
    private String bankName;
    private String branchName;
    private String bankAccNo;
    private String transactionId;
    private String payorderNo;
    private String payMode;
    private Double paidAmount;
    private Integer webUserFlag;
    private Integer approveFlag;
    private Date approveDate;
    private String customerSignatureName;
    private String officerId;
    private String officerContractNo;
    private Date bookingMoneyDate;
    private Double downPaymentPct;
    private Double downPaymentAmount;
    private String downPaymentType;
    private String moneyReceiptNo;
    private Date downPaymentDate;
    private Integer installmentsNo;
    private Integer orderStatus;
    private Double perinstallmentAmount;
    private Date installStartDate;
    private Date installmentEndDate;
    private Long approveBy;
    private Long ssCreator;
    private Date ssCreatedOn;
    private Long ssModifier;
    private Date ssModifiedOn;
}
