export class SaRoledtl {
    roledtlNo: number;
    roleNo: number;
    submenuNo: number;
    canView: number;
    canModify: number;
    canRemove: number;
    canCreate: number;
    companyNo: number;
    ssCreator: number;
    ssCreatedOn: Date;
    ssModifier: number;
    ssModifiedOn: Date;


    constructor(options: any = {}) {
        this.roledtlNo = options.roledtlNo || null;
        this.roleNo = options.roleNo || null;
        this.submenuNo = options.submenuNo || null;
        this.canView = options.canView || null;
        this.canModify = options.canModify || null;
        this.canRemove = options.canRemove || null;
        this.canCreate = options.canCreate || null;
        this.companyNo = options.companyNo || null;
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;

    }
}
