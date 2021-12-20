export class SaRegion {
    regionNo: number;
    regionName: string;
    subregionName: string;
    activeFlag: number;
    subregionNo: number;
    ssCreator: number;
    ssCreatedOn: Date;
    ssModifier: number;
    ssModifiedOn: Date;

    constructor(options: any = {}) {
        this.regionNo = options.regionNo || null;
        this.activeFlag = options.activeFlag || null;
        this.subregionNo = options.subregionNo || null;
        this.regionName = options.regionName || '';
        this.subregionName = options.subregionName || '';
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;

    }
}
