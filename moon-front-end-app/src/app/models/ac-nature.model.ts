export class AcNature {
    natureNo: number;
    natureName: string;
    natureType: string;
    slNo: number;
    ssCreator: number;
    ssCreatedOn: Date;
    ssModifier: number;
    ssModifiedOn: Date;
    natureCode: string;
    companyNo: number;


    constructor(options: any = {}) {
        this.natureNo = options.natureNo || null;
        this.natureName = options.natureName || '';
        this.natureType = options.natureType || '';
        this.slNo = options.slNo || null;
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;
        this.natureCode = options.natureCode || '';
        this.companyNo = options.companyNo || null;

    }
}
