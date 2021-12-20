export class RlPlotPosition {
    positionNo: number;
    positionName: string;
    ssCreatedOn: Date;
    ssCreator: number;
    ssModifiedOn: Date;
    ssModifier: number;

    constructor(options: any = {}) {
        this.positionNo = options.positionNo || null;
        this.positionName = options.positionName || '';
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;
    }
}