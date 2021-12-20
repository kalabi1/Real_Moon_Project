export class AcBank {
    bankdtlNo: number;
    bankNo: number;
    accNo: number;
    bankAccNo: string;
    bankAccType: string;
    bankOpenBalance: number;
    salesAccNo: number;
    checkBook: number;
    lcAdvising: number;
    shortRealAccNo: number;
    accessRealAccNo: number;
    companyNo: number;
    ssCreator: number;
    ssCreatedOn: Date;
    ssModifier: number;
    ssModifiedOn: Date;



    constructor(options: any = {}) {
        this.bankdtlNo = options.bankdtlNo || null;
        this.bankNo = options.bankNo || null;
        this.accNo = options.accNo || null;
        this.bankAccNo = options.bankAccNo || '';
        this.bankAccType = options.bankAccType || '';
        this.bankOpenBalance = options.bankOpenBalance || null;
        this.salesAccNo = options.salesAccNo || null;
        this.checkBook = options.checkBook || null;
        this.lcAdvising = options.lcAdvising || null;
        this.shortRealAccNo = options.shortRealAccNo || null;
        this.accessRealAccNo = options.accessRealAccNo || null;
        this.companyNo = options.companyNo || null;
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;
    }
}
