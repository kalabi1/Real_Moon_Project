export class RlRoadSize {
    sizeNo: number;
    roadSize: number;
    activeFlag: number;
    ssCreatedOn: Date;
    ssCreator: number;
    ssModifiedOn: Date;
    ssModifier: number;

    constructor(options: any = {}) {
        this.sizeNo = options.sizeNo || null;
        this.roadSize = options.roadSize || null;
        this.activeFlag = options.activeFlag || null;
        // this.facingName = options.facingName || '';
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;
    }
}