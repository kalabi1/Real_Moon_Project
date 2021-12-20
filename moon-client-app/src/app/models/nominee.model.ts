export class Nominee {
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
    nomineePictureNameUrl: string;

    constructor(options: any = {}) {
        this.nomineeNo = options.nomineeNo || null;
        this.trnNo = options.trnNo || null;
        this.percentage = options.percentage || null;
        this.nomineeName = options.nomineeName || '';
        this.nomineeEmail = options.nomineeEmail || '';
        this.nomineeFatherName = options.nomineeFatherName || '';
        this.nomineeMotherName = options.nomineeMotherName || '';
        this.relationWithApplicants = options.relationWithApplicants || '';
        this.nomineeMobile = options.nomineeMobile || '';
        this.nomineePresentAddress = options.nomineePresentAddress || '';
        this.nomineePermanentAddress = options.nomineePermanentAddress || '';
        this.nomineePictureName = options.nomineePictureName || '';
        this.nomineePictureNameUrl = options.nomineePictureNameUrl || '';
    }
}