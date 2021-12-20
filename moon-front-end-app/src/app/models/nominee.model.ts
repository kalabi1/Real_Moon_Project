export class RlTrnNominee {
    nomineeNo: number;
    trnNo: number;
    percentage: number;
    nomineeName: string;
    nomineeEmail: string;
    nomineeFatherName: string;
    nomineeMotherName: string;
    relationWithApplicants: string;
    nomineeMobile: string;
    nomineePresentAddress: string;
    nomineePermanentAddress: string;
    nomineePictureName: string;
    nomineeDob: Date;
    nomineeNid: string;

    constructor(options: any = {}) {
        this.nomineeNo = options.nomineeNo || null;
        this.trnNo = options.trnNo || null;
        this.percentage = options.percentage || null;
        this.nomineeName = options.nomineeName || '';
        this.nomineeNid = options.nomineeNid || '';
        this.nomineeEmail = options.nomineeEmail || '';
        this.nomineeFatherName = options.nomineeFatherName || '';
        this.nomineeMotherName = options.nomineeMotherName || '';
        this.relationWithApplicants = options.relationWithApplicants || '';
        this.nomineeMobile = options.nomineeMobile || '';
        this.nomineePresentAddress = options.nomineePresentAddress || '';
        this.nomineePermanentAddress = options.nomineePermanentAddress || '';
        this.nomineePictureName = options.nomineePictureName || '';
        this.nomineeDob = options.nomineeDob ? new Date(options.nomineeDob) : null;

    }
}
