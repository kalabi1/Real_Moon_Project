export class RlTrn {
    trnNo: number;
    trnId: string;
    trnDate: Date;
    itemNo: number;
    customerNo: number;
    totalPrice: number;
    discountPct: number;
    remainingAmount: number;
    discountAmount: number;
    settlementPrice: number;
    bookingRefPerson: string;
    refContactNo: string;
    paymentType: string;
    bookingAmount: number;
    paymentMode: string;
    chequeNo: string;
    ddNo: string;
    ttNo: string;
    chequeDate: Date;
    bankName: string;
    branchName: string;
    approveFlagName: string;
    bankAccNo: string;
    transactionId: string;
    payorderNo: string;
    officerId: string;
    officerContractNo: string;
    payMode: string;
    paidAmount: number;
    specialDiscountAmt: number;
    webUserFlag: number;
    approveFlag: number;
    approveDate: Date;
    customerSignatureName: string;
    approveBy: number;
    installmentPendingAmount: number;
    bookingMoneyDate: Date;
    downPaymentPct: number;
    downPaymentAmount: number;
    downPaymentType: string;
    moneyReceiptNo: string;
    installmentPayStatus: string;
    downPaymentDate: Date;
    installmentsNo: number;
    installmentNo: number;
    orderStatus: number;
    payFlag: number;
    installmentSl: number;
    pendingAmount: number;
    perinstallmentAmount: number;
    installmentAmount: number;
    installStartDate: Date;
    installmentEndDate: Date;
    installmentDate: Date;
    ssCreator: number;
    ssCreatedOn: Date;
    ssModifier: number;
    ssModifiedOn: Date;

    constructor(options: any = {}) {
        this.trnNo = options.trnNo || null;
        this.trnId = options.trnId || '';
        this.installmentPayStatus = options.installmentPayStatus || '';
        this.trnDate = options.trnDate ? new Date(options.trnDate) : null;
        this.customerSignatureName = options.customerSignatureName || '';
        this.itemNo = options.itemNo || null;
        this.downPaymentAmount = options.downPaymentAmount || 0;
        this.paidAmount = options.paidAmount || 0;
        this.pendingAmount = options.pendingAmount || 0;
        this.downPaymentPct = options.downPaymentPct || null;
        this.specialDiscountAmt = options.specialDiscountAmt || null;
        this.customerNo = options.customerNo || null;
        this.totalPrice = options.totalPrice || null;
        this.perinstallmentAmount = options.perinstallmentAmount || null;
        this.installmentNo = options.installmentNo || null;
        this.installmentAmount = options.installmentAmount || null;
        this.webUserFlag = options.webUserFlag || null;
        this.installmentsNo = options.installmentsNo || null;
        this.discountPct = options.discountPct || null;
        this.specialDiscountAmt = options.specialDiscountAmt || null;
        this.orderStatus = options.orderStatus || null;
        this.payFlag = options.payFlag || null;
        this.installmentSl = options.installmentSl || null;
        this.installmentPendingAmount = options.installmentPendingAmount || null;
        this.discountAmount = options.discountAmount || null;
        this.settlementPrice = options.settlementPrice || 0;
        this.moneyReceiptNo = options.moneyReceiptNo || '';
        this.bookingRefPerson = options.bookingRefPerson || '';
        this.downPaymentType = options.downPaymentType || '';
        this.refContactNo = options.refContactNo || '';
        this.paymentType = options.paymentType || '';
        this.bookingAmount = options.bookingAmount || 0;
        this.remainingAmount = options.remainingAmount || 0;
        this.approveFlagName = options.approveFlagName || '';
        this.paymentMode = options.paymentMode || '';
        this.chequeNo = options.chequeNo || '';
        this.payMode = options.payMode || '';
        this.ddNo = options.ddNo || '';
        this.ttNo = options.ttNo || '';
        this.officerId = options.officerId || '';
        this.officerContractNo = options.officerContractNo || '';
        this.bankName = options.bankName || '';
        this.branchName = options.branchName || '';
        this.bankAccNo = options.bankAccNo || '';
        this.transactionId = options.transactionId || '';
        this.payorderNo = options.payorderNo || '';
        this.installmentEndDate = options.installmentEndDate ? new Date(options.installmentEndDate) : null;
        this.installmentDate = options.installmentDate ? new Date(options.installmentDate) : null;
        this.installStartDate = options.installStartDate ? new Date(options.installStartDate) : null;
        this.bookingMoneyDate = options.bookingMoneyDate ? new Date(options.bookingMoneyDate) : null;
        this.downPaymentDate = options.downPaymentDate ? new Date(options.downPaymentDate) : null;
        this.chequeDate = options.chequeDate ? new Date(options.chequeDate) : null;
        this.approveDate = options.approveDate ? new Date(options.approveDate) : null;
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;
    }
}
