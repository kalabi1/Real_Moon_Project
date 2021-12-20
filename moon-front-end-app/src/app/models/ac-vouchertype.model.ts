export class AcVouchertype {

    vtypeNo: number;
    typeName: string;
    alias: string;
    vType: string;
    descr: string;
    ssCreator: number;
    ssCreatedOn: Date;
    ssModifier: number;
    ssModifiedOn: Date;
    vDefault: number;
    autogenFlag: number;
    genType: string;
    genFlag: number;
    companyNo: number;


    constructor(options: any = {}) {
       
        this.vtypeNo = options.vtypeNo || null;
        this.typeName = options.typeName || '';
        this.alias = options.alias || '';
        this.vType = options.vType || '';
        this.descr = options.descr || '';
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;
        this.vDefault = options.vDefault || null;
        this.autogenFlag = options.autogenFlag || null;
        this.genType = options.genType || '';
        this.genFlag = options.genFlag || null;
        this.companyNo = options.companyNo || null; 
    }
}
