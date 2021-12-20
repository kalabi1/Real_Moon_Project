export class InUom {
    uomNo: number;
    uom: string;
    uomShort: string;
    activeFlag: number;
    ssCreator: number;
    ssCreatedOn: Date;
    ssModifier: number;
    ssModifiedOn: Date;

    constructor(options: any = {}) {
        this.uomNo = options.uomNo || null;
        this.activeFlag = options.activeFlag || null;
        this.uom = options.uom || '';
        this.uomShort = options.uomShort || '';
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;

    }
}
