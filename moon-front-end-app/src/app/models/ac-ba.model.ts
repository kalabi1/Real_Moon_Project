export class AcBa {
    baNo: number;
    baNoParent: number;
    baName: string;
    descr: string;
    masterBaFlag: number;
    inactiveStat: number;
    companyNo: number;
    ssCreator: number;
    ssCreatedOn: Date;
    ssModifier: number;
    ssModifiedOn: Date;


    constructor(options: any = {}) {
        this.baNo = options.baNo || null;
        this.baNoParent = options.baNoParent || null;
        this.baName = options.baName || '';
        this.descr = options.descr || '';
        this.masterBaFlag = options.masterBaFlag || null;
        this.inactiveStat = options.inactiveStat || null;
        this.companyNo = options.companyNo || null;
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;

    }
}
