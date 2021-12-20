export class AcVoucherdtl {
    
    vdtlNo: number;
    vNo: number;
    accNo: number;
    narration: string;
    dr: number;
    cr: number;
    chequeNo: string;
    chequeDate: Date;
    bankName: string;
    bankAccno: string;
    costNo: number;
    inBillNo: number;
    ssOgNo: number;
    creditCardNo: string;
    curNo: number;
    exchangeRate: number;
    voidFlag: string;
    allocationFlag: number;
    fundDistributionNo: number;
    costUpdOnlyFlg: number;
    baNo: number;
    companyNo: number;
    ctrlAccFlg: number;
    qjAccFlg: number;
    qjdtlNo: number;
    chkRecNo: string;
    chkRecDate: Date;
    chkDepDate: Date;
    chkVoidDate: Date;
    chkDescription: string;
    refNo: number;
    ssCreator: number;
    ssCreatedOn: Date;
    ssModifier: number;
    ssModifiedOn: Date;


    constructor(options: any = {}) {
        this.vdtlNo = options.vdtlNo || null;
        this.vNo = options.vNo || null;
        this.accNo = options.accNo || null;
        this.narration = options.narration || '';
        this.dr = options.dr || null;
        this.cr = options.cr || null;
        this.chequeNo = options.chequeNo || '';
        this.chequeDate = options.chequeDate ? new Date(options.chequeDate) : null;
        this.bankName = options.bankName || '';
        this.bankAccno = options.bankAccno || '';
        this.costNo = options.costNo || null;
        this.inBillNo = options.inBillNo || null;
        this.ssOgNo = options.ssOgNo || null;
        this.creditCardNo = options.creditCardNo || '';
        this.curNo = options.curNo || null;
        this.exchangeRate = options.exchangeRate || null;
        this.voidFlag = options.voidFlag || '';
        this.allocationFlag = options.allocationFlag || null;
        this.fundDistributionNo = options.fundDistributionNo || null;
        this.costUpdOnlyFlg = options.costUpdOnlyFlg || null;
        this.baNo = options.baNo || null;
        this.companyNo = options.companyNo || null;
        this.ctrlAccFlg = options.ctrlAccFlg || null;
        this.qjAccFlg = options.qjAccFlg || null;
        this.qjdtlNo = options.qjdtlNo || null;
        this.chkRecNo = options.chkRecNo || '';
        this.chkRecDate = options.chkRecDate ? new Date(options.chkRecDate) : null;
        this.chkDepDate = options.chkDepDate ? new Date(options.chkRecDate) : null;
        this.chkVoidDate = options.chkVoidDate ? new Date(options.chkRecDate) : null;
        this.chkDescription = options.chkDescription || '';
        this.refNo = options.refNo || null;
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;
    }
}
