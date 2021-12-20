export class Customer {
    customerNo: number;
    price: number;
    customerId: string;
    customerName: string;
    fatherName: string;
    motherName: string;
    spouseName: string;
    permanetAddress: string;
    presentAddress: string;
    dob: Date;
    religion: string;
    nid: string;
    nationality: string;
    nationalityDisplay: string;
    telephone: string;
    mobile: string;
    email: string;
    contactPerson: string;
    cpMobile: string;
    profession_no: null;
    designation: string;
    officeAddress: string;
    customerPictureName: string;
    password: string;
    confirmPassword: string;
    permanentAddress: string;

    constructor(options: any = {}) {
        this.customerNo = options.customerNo || 0;
        this.price = options.price || 0;
        this.profession_no = options.profession_no || null;
        this.customerId = options.customerId || '';
        this.customerName = options.customerName || '';
        this.fatherName = options.fatherName || '';
        this.motherName = options.motherName || '';
        this.spouseName = options.spouseName || '';
        this.permanetAddress = options.permanetAddress || '';
        this.presentAddress = options.presentAddress || '';
        this.religion = options.religion || '';
        this.nid = options.nid || '';
        this.nationality = options.nationality || '';
        this.telephone = options.telephone || '';
        this.mobile = options.mobile || '';
        this.email = options.email || '';
        this.designation = options.designation || '';
        this.contactPerson = options.contactPerson || '';
        this.cpMobile = options.cpMobile || '';
        this.officeAddress = options.officeAddress || '';
        this.customerPictureName = options.customerPictureName || '';
        this.password = options.password || '';
        this.confirmPassword = options.confirmPassword || '';
        this.permanentAddress = options.permanentAddress || '';
        this.nationalityDisplay = options.nationalityDisplay || '';
        this.dob = options.dob ? new Date(options.dob) : null;
    }
}
