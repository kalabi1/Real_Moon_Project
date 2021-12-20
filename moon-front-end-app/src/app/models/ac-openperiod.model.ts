export class AcOpenperiod {
    periodNo: number;
    accNo: number;
    startPeriodDate: Date;
    endPeriodDate: Date;
    openDate: Date;
    dr: number;
    cr: number;
    closeDate: Date;
    clDr: number;
    clCr: number;
    costNo: number;
    ssOgNo: number;
    openperiodNo: number;
    baNo: number;
    companyNo: number;
    processBySystemFlag: number;
    descr: string;
    ssCreator: number;
    ssCreatedOn: Date;
    ssModifier: number;
    ssModifiedOn: Date;


    constructor(options: any = {}) {
        this.periodNo = options.periodNo || null;
        this.accNo = options.accNo || null;
        this.startPeriodDate = options.startPeriodDate ? new Date(options.ssCreatedOn) : null;
        this.endPeriodDate = options.endPeriodDate ? new Date(options.ssCreatedOn) : null;
        this.openDate = options.openDate ? new Date(options.ssCreatedOn) : null;
        this.dr = options.dr || null;
        this.cr = options.cr || null;
        this.closeDate = options.closeDate ? new Date(options.ssCreatedOn) : null;
        this.clDr = options.clDr || null;
        this.clCr = options.clCr || null;
        this.costNo = options.costNo || null;
        this.ssOgNo = options.ssOgNo || null;
        this.openperiodNo = options.openperiodNo || null;
        this.baNo = options.baNo || null;
        this.companyNo = options.companyNo || null;
        this.processBySystemFlag = options.processBySystemFlag || null;
        this.descr = options.descr || '';
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;


    }
}
