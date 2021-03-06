export class RlTrn {
    trnNo: number;
    trnId: string;
    trnDate: Date;
    itemNo: number;
    customerNo: number;
    totalPrice: number;
    specialDiscountPct: number;
    specialDiscountAmt: number;
    settlementPrice: number;
    bookingRefPerson: string;
    refContactNo: string;
    paymentType: string;
    bookingAmount: number;
    moneyReceiptNo: string;
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
    payMode: string;
    officerId: string;
    paidAmount: number;
    webUserFlag: number;
    approveFlag: number;
    downPaymentPct: number;
    approveDate: Date;
    approveBy: number;
    downPaymentAmount: number;
    customerSignatureName: string;
    downPaymentType: string;
    ssCreator: number;
    ssModifier: number;
    remainingAmount: number;
    installmentsNo: number;
    ssCreatedOn: Date;
    ssModifiedOn: Date;
    bookingMoneyDate: Date;
    downPaymentDate: Date;
    perinstallmentAmount: number;
    payFlag: number;
    installmentSl: number;
    installmentAmount: number;
    installmentDate: Date;
    installStartDate: Date;
    installmentEndDate: Date;
    pendingAmount: number;
    installmentPayCount: number;
    installmentPayAmount: number;
    installmentPayStatus: string;

    constructor(options: any = {}) {
        this.trnNo = options.trnNo || null;
        this.trnId = options.trnId || '';
        this.customerSignatureName = options.customerSignatureName || '';
        this.trnDate = options.trnDate ? new Date(options.trnDate) : null;
        this.itemNo = options.itemNo || null;
        this.paidAmount = options.paidAmount || 0;
        this.customerNo = options.customerNo || null;
        this.downPaymentPct = options.downPaymentPct || null;
        this.pendingAmount = options.pendingAmount || 0;
        this.installmentPayCount = options.installmentPayCount || 0;
        this.installmentPayAmount = options.installmentPayAmount || 0;
        this.totalPrice = options.totalPrice || null;
        this.installmentsNo = options.installmentsNo || 0;
        this.webUserFlag = options.webUserFlag || null;
        this.payFlag = options.payFlag || 0;
        this.installmentSl = options.installmentSl || 0;
        this.specialDiscountPct = options.specialDiscountPct || null;
        this.specialDiscountAmt = options.specialDiscountAmt || null;
        this.settlementPrice = options.settlementPrice || 0;
        this.downPaymentAmount = options.downPaymentAmount || 0;
        this.remainingAmount = options.remainingAmount || null;
        this.moneyReceiptNo = options.moneyReceiptNo || '';
        this.perinstallmentAmount = options.perinstallmentAmount || 0;
        this.installmentAmount = options.installmentAmount || 0;
        this.bookingRefPerson = options.bookingRefPerson || '';
        this.refContactNo = options.refContactNo || '';
        this.paymentType = options.paymentType || '';
        this.bookingAmount = options.bookingAmount || 0;
        this.approveFlagName = options.approveFlagName || '';
        this.downPaymentType = options.downPaymentType || '';
        this.installmentPayStatus = options.installmentPayStatus || '';
        this.paymentMode = options.paymentMode || '';
        this.chequeNo = options.chequeNo || '';
        this.ddNo = options.ddNo || '';
        this.ttNo = options.ttNo || '';
        this.bankName = options.bankName || '';
        this.branchName = options.branchName || '';
        this.bankAccNo = options.bankAccNo || '';
        this.transactionId = options.transactionId || '';
        this.payorderNo = options.payorderNo || '';
        this.officerId = options.officerId || '';
        this.chequeDate = options.handOverTime ? new Date(options.chequeDate) : null;
        this.approveDate = options.handOverTime ? new Date(options.approveDate) : null;
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.handOverTime ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.handOverTime ? new Date(options.ssModifiedOn) : null;
        this.bookingMoneyDate = options.bookingMoneyDate ? new Date(options.bookingMoneyDate) : null;
        this.downPaymentDate = options.downPaymentDate ? new Date(options.downPaymentDate) : null;
        this.installmentDate = options.installmentDate ? new Date(options.installmentDate) : null;
        this.installStartDate = options.installStartDate ? new Date(options.installStartDate) : null;
        this.installmentEndDate = options.installmentEndDate ? new Date(options.installmentEndDate) : null;
    }
}
