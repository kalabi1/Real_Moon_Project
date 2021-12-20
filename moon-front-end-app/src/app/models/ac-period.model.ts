export class AcPeriod {
    periodNo: number;
    startPeriodDate: Date;
    endPeriodDate: Date;
    closeFlag: number;
    companyNo: number;
    ssCreator: number;
    ssCreatedOn: Date;
    ssModifier: number;
    ssModifiedOn: Date;

    constructor(options: any = {}) {
        this.periodNo = options.periodNo || null;
        this.startPeriodDate = options.startPeriodDate ? new Date(options.startPeriodDate) : null;
        this.endPeriodDate = options.endPeriodDate ? new Date(options.endPeriodDate) : null;
        this.closeFlag = options.closeFlag || null;
        this.companyNo = options.companyNo || null;
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;

    }
}
