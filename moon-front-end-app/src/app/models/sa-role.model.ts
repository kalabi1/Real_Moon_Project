export class SaRole {
    roleNo: number;
    roleId: string;
    roleName: string;
    descr: string;
    activeStat: number;
    companyNo: number;
    ssCreator: number;
    ssCreatedOn: Date;
    ssModifier: number;
    ssModifiedOn: Date;


    constructor(options: any = {}) {
        this.roleNo = options.roleNo || null;
        this.roleId = options.roleId || '';
        this.roleName = options.roleName || '';
        this.descr = options.descr || '';
        this.activeStat = options.activeStat || null;
        this.companyNo = options.companyNo || null;
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;


    }
}
