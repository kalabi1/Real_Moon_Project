package com.nahalit.nahalapimanager.dao;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class RL1019Dao {
    private final NamedParameterJdbcTemplate db;

    public RL1019Dao(NamedParameterJdbcTemplate db) {
        this.db = db;
    }

    public List getTrnList(String trnNo, String customerNo, String itemNo, String ssCreartor) {

        Map<String, String> params = new HashMap();
        params.put("TRN_NO", trnNo);
        params.put("CUSTOMER_NO", customerNo);
        params.put("ITEM_NO", itemNo);

        StringBuilder sql = new StringBuilder();

        sql.append(" SELECT T.TRN_NO \"trnNo\",");
        sql.append("     T.TRN_ID \"trnId\",");
        sql.append("     T.TRN_DATE \"trnDate\",");
        sql.append("     T.ITEM_NO \"itemNo\",");
        sql.append("     T.CUSTOMER_NO \"customerNo\",");
        sql.append("     T.TOTAL_PRICE \"totalPrice\",");
        sql.append("     T.SPECIAL_DISCOUNT_PCT \"specialDiscountPct\",");
        sql.append("     T.SPECIAL_DISCOUNT_AMT \"specialDiscountAmt\",");
        sql.append("     T.SETTLEMENT_PRICE \"settlementPrice\",");
        sql.append("     T.BOOKING_REF_PERSON \"bookingRefPerson\",");
        sql.append("     T.REF_CONTACT_NO \"refContactNo\",");
        sql.append("     T.PAYMENT_TYPE \"paymentType\",");
        sql.append("     T.BOOKING_AMOUNT \"bookingAmount\",");
        sql.append("     T.PAYMENT_MODE \"paymentMode\",");
        sql.append("     T.CHEQUE_NO \"chequeNo\",");
        sql.append("     T.CHEQUE_DATE \"chequeDate\",");
        sql.append("     T.BANK_NAME \"bankName\",");
        sql.append("     T.BRANCH_NAME \"branchName\",");
        sql.append("     T.BANK_ACC_NO \"bankAccNo\",");
        sql.append("     T.TRANSACTION_ID \"transactionId\",");
        sql.append("     T.PAYORDER_NO \"payorderNo\",");
        sql.append("     T.PAY_MODE \"payMode\",");
        sql.append("     T.PAID_AMOUNT \"paidAmount\",");
        sql.append("     T.WEB_USER_FLAG \"webUserFlag\",");
        sql.append("     T.SS_CREATOR \"ssCreator\",");
        sql.append("     T.SS_CREATED_ON \"ssCreatedOn\",");
        sql.append("     T.SS_MODIFIER \"ssModifier\",");
        sql.append("     T.SS_MODIFIED_ON \"ssModifiedOn\",");
        sql.append("     T.DD_NO \"ddNo\",");
        sql.append("     T.TT_NO \"ttNo\",");
        sql.append("     T.APPROVE_FLAG \"approveFlag\",");
        sql.append("     DECODE(nvl(T.APPROVE_FLAG,0),1,'Approved',0,'Pending',2,'Canceled') \"approveFlagName\",");
        sql.append("     T.APPROVE_DATE \"approveDate\",");
        sql.append("     T.APPROVE_BY \"approveBy\",");
        sql.append("     T.BOOKING_MONEY_DATE \"bookingMoneyDate\",");
        sql.append("     T.OFFICER_ID \"officerId\",");
        sql.append("     T.OFFICER_CONTRACT_NO \"officerContractNo\",");
        sql.append("     T.DOWN_PAYMENT_PCT \"downPaymentPct\",");
        sql.append("     T.DOWN_PAYMENT_AMOUNT \"downPaymentAmount\",");
        sql.append("     T.DOWN_PAYMENT_TYPE \"downPaymentType\",");
        sql.append("     T.MONEY_RECEIPT_NO \"moneyReceiptNo\",");
        sql.append("     T.DOWN_PAYMENT_DATE \"downPaymentDate\",");
        sql.append("     T.INSTALLMENTS_NO \"installmentsNo\",");
        sql.append("     T.PERINSTALLMENT_AMOUNT \"perinstallmentAmount\",");
        sql.append("     T.INSTALL_START_DATE \"installStartDate\",");
        sql.append("     C.CUSTOMER_ID \"customerId\",");
        sql.append("     C.CUSTOMER_NAME \"customerName\",");
        sql.append("     I.ITEM_ID \"itemId\",");
        sql.append("     I.ITEM_NAME \"itemName\",");
        sql.append("     y.TYPE_NAME \"itemTypeName\"");
        sql.append(" FROM RL_TRN T,");
        sql.append("     RL_CUSTOMER C,");
        sql.append("     RL_ITEM I,");
        sql.append("     RL_ITEM_TYPE y");
        sql.append(" WHERE T.CUSTOMER_NO= C.CUSTOMER_NO");
        sql.append("   AND T.ITEM_NO=I.ITEM_NO(+)");
        sql.append("   AND I.ITEM_TYPE_NO=y.TYPE_NO");
        sql.append(" AND T.TRN_NO=NVL(:TRN_NO,T.TRN_NO)");
        sql.append(" AND T.CUSTOMER_NO = NVL(:CUSTOMER_NO,T.CUSTOMER_NO)");
        sql.append(" order by t.trn_no");
//    sql.append(" AND T.ITEM_NO = NVL(:ITEM_NO,T.ITEM_NO)");
//    sql.append(" AND T.SS_CREATOR = NVL(:ITEM_NO,T.SS_CREATOR)");

        return db.queryForList(sql.toString(), params);
    }

    public void deleteByTrnNo(Long trnNo) {
        Map<String, Long> params = new HashMap<>();
        params.put("TRN_NO", trnNo);
        db.update("DELETE RL_TRN_INSTALLMENT WHERE TRN_NO=:TRN_NO AND NVL(PAY_FLAG,0)=0", params);
    }

    public Map getTrnInstallmentCollStatus(Long trnNo) {
        Map<String, Long> params = new HashMap<>();
        params.put("TRN_NO", trnNo);
        return db.queryForMap("SELECT COUNT(0) STATUS FROM RL_TRN_INSTALLMENT WHERE TRN_NO=:TRN_NO AND NVL(PAY_FLAG,0)=1", params);
    }

    public String getTrnId(Date trnDate) {
        Map<String, Date> params = new HashMap<>();
        params.put("trn_date", trnDate);

        StringBuilder sql = new StringBuilder();
        sql.append(" select 'TID' || TO_CHAR(:trn_date, 'rr') || NVL(id, 1001) ID");
        sql.append(" from (");
        sql.append("          SELECT MAX(SUBSTR(trn_id, 6)) + 1 ID");
        sql.append("          FROM rl_trn");
        sql.append("          WHERE SUBSTR(trn_id, 4, 2) = TO_CHAR(:trn_date, 'rr'))");

        Map trnId = db.queryForMap(sql.toString(), params);
        return trnId.get("ID").toString();
    }


    public Map getTrnDetails(String trnNo) {

        Map<String, String> params = new HashMap();
        params.put("TRN_NO", trnNo);

        StringBuilder sql = new StringBuilder();

        sql.append(" SELECT T.TRN_NO \"trnNo\",");
        sql.append("     T.TRN_ID \"trnId\",");
        sql.append("     T.TRN_DATE \"trnDate\",");
        sql.append("     T.ITEM_NO \"itemNo\",");
        sql.append("     T.CUSTOMER_NO \"customerNo\",");
        sql.append("     T.TOTAL_PRICE \"totalPrice\",");
        sql.append("     T.SPECIAL_DISCOUNT_PCT \"specialDiscountPct\",");
        sql.append("     T.SPECIAL_DISCOUNT_AMT \"specialDiscountAmt\",");
        sql.append("     T.SETTLEMENT_PRICE \"settlementPrice\",");
        sql.append("     T.BOOKING_REF_PERSON \"bookingRefPerson\",");
        sql.append("     T.REF_CONTACT_NO \"refContactNo\",");
        sql.append("     T.PAYMENT_TYPE \"paymentType\",");
        sql.append("     T.BOOKING_AMOUNT \"bookingAmount\",");
        sql.append("     T.PAYMENT_MODE \"paymentMode\",");
        sql.append("     T.CHEQUE_NO \"chequeNo\",");
        sql.append("     T.CHEQUE_DATE \"chequeDate\",");
        sql.append("     T.BANK_NAME \"bankName\",");
        sql.append("     T.BRANCH_NAME \"branchName\",");
        sql.append("     T.BANK_ACC_NO \"bankAccNo\",");
        sql.append("     T.TRANSACTION_ID \"transactionId\",");
        sql.append("     T.PAYORDER_NO \"payorderNo\",");
        sql.append("     T.PAY_MODE \"payMode\",");
        sql.append("     T.PAID_AMOUNT \"paidAmount\",");
        sql.append("     T.ORDER_STATUS \"orderStatus\",");
        sql.append("     T.WEB_USER_FLAG \"webUserFlag\",");
        sql.append("     T.SS_CREATOR \"ssCreator\",");
        sql.append("     DECODE(nvl(T.APPROVE_FLAG,0),1,'Approved',0,'Pending',2,'Canceled') \"approveFlagName\",");
        sql.append("     y.TYPE_NAME \"itemTypeName\",");
        sql.append("     T.SS_CREATED_ON \"ssCreatedOn\",");
        sql.append("     T.SS_MODIFIER \"ssModifier\",");
        sql.append("     T.SS_MODIFIED_ON \"ssModifiedOn\",");
        sql.append("     T.DD_NO \"ddNo\",");
        sql.append("     T.TT_NO \"ttNo\",");
        sql.append("     T.APPROVE_FLAG \"approveFlag\",");
        sql.append("     T.APPROVE_DATE \"approveDate\",");
        sql.append("     T.APPROVE_BY \"approveBy\",");
        sql.append("     T.BOOKING_MONEY_DATE \"bookingMoneyDate\",");
        sql.append("     T.OFFICER_ID \"officerId\",");
        sql.append("     T.OFFICER_CONTRACT_NO \"officerContractNo\",");
        sql.append("     T.DOWN_PAYMENT_PCT \"downPaymentPct\",");
        sql.append("     T.CUSTOMER_SIGNATURE_NAME \"customerSignatureName\",");
        sql.append("     T.DOWN_PAYMENT_AMOUNT \"downPaymentAmount\",");
        sql.append("     T.DOWN_PAYMENT_TYPE \"downPaymentType\",");
        sql.append("     T.MONEY_RECEIPT_NO \"moneyReceiptNo\",");
        sql.append("     T.DOWN_PAYMENT_DATE \"downPaymentDate\",");
        sql.append("     T.INSTALLMENTS_NO \"installmentsNo\",");
        sql.append("     T.PERINSTALLMENT_AMOUNT \"perinstallmentAmount\",");
        sql.append("     T.INSTALL_START_DATE \"installStartDate\",");
        sql.append("     T.INSTALLMENT_END_DATE \"installmentEndDate\",");
        sql.append("     C.CUSTOMER_ID \"customerId\",");
        sql.append("     C.CUSTOMER_NAME \"customerName\",");
        sql.append("     I.ITEM_ID \"itemId\",");
        sql.append("     I.ITEM_NAME \"itemName\"");
        sql.append(" FROM RL_TRN T,");
        sql.append("     RL_CUSTOMER C,");
        sql.append("     RL_ITEM I,");
        sql.append("     RL_ITEM_TYPE y");
        sql.append(" WHERE T.CUSTOMER_NO= C.CUSTOMER_NO");
        sql.append("   AND I.ITEM_TYPE_NO=y.TYPE_NO");
        sql.append("   AND T.ITEM_NO=I.ITEM_NO(+)");
        sql.append(" AND T.TRN_NO=:TRN_NO");

        return db.queryForMap(sql.toString(), params);
    }

    public List getTrnInstallmentList(Long trnNo) {
        StringBuilder sql = new StringBuilder();

        sql.append(" SELECT i.INSTALLMENT_NO \"installmentNo\",");
        sql.append("        i.INSTALLMENT_AMOUNT \"installmentAmount\",");
        sql.append("        i.paid_amount \"paidAmount\",");
        sql.append("        NVL (i.INSTALLMENT_AMOUNT, 0) - NVL (i.paid_amount, 0) \"pendingAmount\",");
        sql.append("        ii.TRN_NO \"trnNo\",");
        sql.append("        SS_CREATED_ON \"ssCreatedOn\",");
        sql.append("        SS_CREATOR \"ssCreator\",");
        sql.append("        SS_MODIFIED_ON \"ssModifiedOn\",");
        sql.append("        SS_MODIFIER \"ssModifier\",");
        sql.append("        INSTALLMENT_DATE \"installmentDate\",");
        sql.append("        PAY_FLAG \"payFlag\",");
        sql.append("        INSTALLMENT_SL \"installmentSl\"");
        sql.append("   FROM (  SELECT INSTALLMENT_NO,");
        sql.append("                  SUM (INSTALLMENT_AMOUNT) INSTALLMENT_AMOUNT,");
        sql.append("                  SUM (paid_amoun) paid_amount");
        sql.append("             FROM (SELECT INSTALLMENT_NO, INSTALLMENT_AMOUNT, NULL paid_amoun");
        sql.append("                     FROM rl_trn_installment");
        sql.append("                   UNION ALL");
        sql.append("                     SELECT INSTALLMENT_NO, NULL, SUM (paid_amount) paid_amount");
        sql.append("                       FROM rl_collection");
        sql.append("                   GROUP BY INSTALLMENT_NO)");
        sql.append("         GROUP BY INSTALLMENT_NO) i,");
        sql.append("        rl_trn_installment ii");
        sql.append("  WHERE i.INSTALLMENT_NO = ii.INSTALLMENT_NO(+)");
        sql.append("  AND II.TRN_NO=:TRN_NO");
        sql.append("   ORDER BY INSTALLMENT_SL");

        Map params = new HashMap();
        params.put("TRN_NO", trnNo);

        return db.queryForList(sql.toString(), params);
    }
}
