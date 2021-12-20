export class AcCostcenter {
    costNo: number;
    costNoParent: number;
    costName: string;
    descr: string;
    inactiveStat: number;
    recurringFlag: number;
    companyNo: number;
    accNo: number;
    ssCreator: number;
    ssCreatedOn: Date;
    ssModifier: number;
    ssModifiedOn: Date;

    constructor(options: any = {}) {
        this.costNo = options.costNo || null;
        this.costNoParent = options.costNoParent || null;
        this.costName = options.costName || '';
        this.descr = options.descr || '';
        this.inactiveStat = options.inactiveStat || null;
        this.recurringFlag = options.recurringFlag || null;
        this.companyNo = options.companyNo || null;
        this.accNo = options.accNo || null;
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;

    }
}
