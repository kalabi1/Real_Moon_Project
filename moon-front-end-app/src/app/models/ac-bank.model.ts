export class AcBank {
    bankNo: number;
    alias: string;
    branchName: string;
    subbankOf: number;
    address: string;
    swiftCode: string;
    phone1: string;
    phone2: string;
    phone3: string;
    mobile: string;
    fax: string;
    email: string;
    web: string;
    note: string;
    bankFlag: number;
    activeStat: number;
    companyNo: number;
    ssCreatedOn: Date;
    ssCreator: number;
    ssModifiedOn: Date;
    ssModifier: number;



    constructor(options: any = {}) {
        this.bankNo = options.bankNo || null;
        this.alias = options.alias || '';
        this.branchName = options.branchName || '';
        this.subbankOf = options.subbankOf || null;
        this.address = options.address || '';
        this.swiftCode = options.swiftCode || '';
        this.phone1 = options.phone1 || '';
        this.phone2 = options.phone2 || '';
        this.phone3 = options.phone3 || '';
        this.mobile = options.mobile || '';
        this.fax = options.fax || '';
        this.email = options.email || '';
        this.web = options.web || '';
        this.note = options.note || '';
        this.ssModifier = options.ssModifier || null;
        this.bankFlag = options.bankFlag || null;
        this.activeStat = options.activeStat || null;
        this.companyNo = options.companyNo || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssCreator = options.ssCreator || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;


    }
}
