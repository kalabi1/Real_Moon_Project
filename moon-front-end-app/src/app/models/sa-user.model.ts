export class SaUser {
    userNo: number;
    userId: string;
    userName: string;
    userPwd: string;
    securityQues1: string;
    securityAns1: string;
    securityQues2: string;
    securityAns2: string;
    activeFrom: Date;
    activeTo: Date;
    description: string;
    authType: number;
    intEmpNo: number;
    extEmpNo: number;
    activeStat: number;
    ssCreator: number;
    ssCreatedOn: Date;
    ssModifier: number;
    ssModifiedOn: Date;
    nlsFlag: number;
    companyNo: number;


    constructor(options: any = {}) {
        this.userNo = options.userNo || null;
        this.userId = options.userId || '';
        this.userName = options.userName || '';
        this.userPwd = options.userPwd || '';
        this.securityQues1 = options.securityQues1 || '';
        this.securityAns1 = options.securityAns1 || '';
        this.securityQues2 = options.securityQues2 || '';
        this.securityAns2 = options.securityAns2 || '';
        this.activeFrom = options.activeFrom ? new Date(options.ssCreatedOn) : null;
        this.activeTo = options.activeTo ? new Date(options.ssCreatedOn) : null;
        this.description = options.description || '';
        this.authType = options.authType || null;
        this.intEmpNo = options.intEmpNo || null;
        this.extEmpNo = options.extEmpNo || null;
        this.activeStat = options.activeStat || null;
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;
        this.nlsFlag = options.nlsFlag || null;
        this.companyNo = options.companyNo || null;
    }
}
