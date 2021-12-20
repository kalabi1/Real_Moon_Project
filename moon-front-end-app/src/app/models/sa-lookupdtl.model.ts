export class SaLookupdtl {
    lookupNo: number;
    dtlName: string;
    activeStat: number;
    lookupdtlNo: number;
    ssCreator: number;
    ssCreatedOn: Date;
    ssModifier: number;
    ssModifiedOn: Date;
    descr: string;
    lookupdtlNoParent: number;
    slNo: number;
    ssUploadedOn: string;
    shortName: string;
    nlsName: string;
    ssIsUploaded: number;
    ssIsDeleted: number;
    companyNo: number;
    ssOgNo: number;



    constructor(options: any = {}) {
        this.lookupNo = options.lookupNo || null;
        this.dtlName = options.dtlName || '';
        this.activeStat = options.activeStat || null;
        this.lookupdtlNo = options.lookupdtlNo || null;
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;
        this.descr = options.descr || '';
        this.lookupdtlNoParent = options.lookupdtlNoParent || null;
        this.slNo = options.slNo || null;
        this.ssUploadedOn = options.ssUploadedOn || '';
        this.shortName = options.shortName || '';
        this.nlsName = options.nlsName || '';
        this.ssIsUploaded = options.ssIsUploaded || null;
        this.ssIsDeleted = options.ssIsDeleted || null;
        this.companyNo = options.companyNo || null;
        this.ssOgNo = options.ssOgNo || null;

    }
}