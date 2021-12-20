export class AcConfig {
    acConfigNo: number;
    cofigNo: number;
    ogNo: number;
    nameCodeStyle: string;
    billVoucher: number;
    convBillVoucher: number;
    convLblAccNo: number;
    convPayVoucher: number;
    convDrAccNo: number;
    otherBillVoucher: number;
    otherLblAccNo: number;
    otherPayVoucher: number;
    otherDrAccNo: number;
    protectOtherSrcJournal: number;
    ssCreator: number;
    ssCreatedOn: Date;
    ssModifier: number;
    ssModifiedOn: Date;
    companyNo: number;
    showBuAliasAccName: number;
    fixedLenNumericCodeFlg: number;
    numericCodeFormat: string;
    voucherEntryWithinDays: number;
    multicompanyChart: number;
    multicompanyCost: number;
    loanLgrGrpShort: number;
    loanLgrGrpLong: number;
    previousDateShow: number;
    usedShortKey: number;

    constructor(options: any = {}) {
        this.acConfigNo = options.acConfigNo || null;
        this.cofigNo = options.cofigNo || null;
        this.ogNo = options.ogNo || null;
        this.nameCodeStyle = options.nameCodeStyle || '';
        this.billVoucher = options.billVoucher || null;
        this.convBillVoucher = options.convBillVoucher || null;
        this.convLblAccNo = options.convLblAccNo || null;
        this.convPayVoucher = options.convPayVoucher || null;
        this.convDrAccNo = options.convDrAccNo || null;
        this.otherBillVoucher = options.otherBillVoucher || null;
        this.otherLblAccNo = options.otherLblAccNo || null;
        this.otherPayVoucher = options.otherPayVoucher || null;
        this.otherDrAccNo = options.otherDrAccNo || null;
        this.protectOtherSrcJournal = options.protectOtherSrcJournal || null;
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;
        this.companyNo = options.companyNo || null;
        this.showBuAliasAccName = options.showBuAliasAccName || null;
        this.fixedLenNumericCodeFlg = options.fixedLenNumericCodeFlg || null;
        this.numericCodeFormat = options.numericCodeFormat || '';
        this.voucherEntryWithinDays = options.voucherEntryWithinDays || null;
        this.multicompanyChart = options.multicompanyChart || null;
        this.multicompanyCost = options.multicompanyCost || null;
        this.loanLgrGrpShort = options.loanLgrGrpShort || null;
        this.loanLgrGrpLong = options.loanLgrGrpLong || null;
        this.previousDateShow = options.previousDateShow || null;
        this.usedShortKey = options.usedShortKey || null;


    }
}
