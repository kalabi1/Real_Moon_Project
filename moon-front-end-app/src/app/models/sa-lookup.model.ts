export class SaLookup {
    lookupNo: number;
    lookupName: string;
    descr: string;
    canChange: number;
    ssCreator: number;
    ssCreatedOn: Date;
    ssModifier: number;
    ssModifiedOn: Date;
    ssUploadedOn: Date;


    constructor(options: any = {}) {
        this.lookupNo = options.lookupNo || null;
        this.lookupName = options.lookupName || '';
        this.descr = options.descr || '';
        this.canChange = options.canChange || null;
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;
        this.ssUploadedOn = options.ssUploadedOn ? new Date(options.ssCreatedOn) : null;

    }
}