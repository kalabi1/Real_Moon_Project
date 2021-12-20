export class Customer {
    customerNo: number;
    customerId: string;
    customerName: string;
    fatherName: string;
    motherName: string;
    spouseName: string;
    permanentAddress: string;
    presentAddress: string;
    dob: Date;
    nid: string;
    nationality: string;
    telephone: string;
    mobile: string;
    email: string;
    contactPerson: string;
    cpMobile: string;
    profession_no: number;
    designation: string;
    officeAddress: string;
    customerPictureName: string;
    password: string;
    customProfilePhoto: string;
    religionName: string;
    cpAddress: string;
    cpEmail: string;




    constructor(options: any = {}) {
        this.customerNo = options.customerNo || 0;
        this.profession_no = options.profession_no || null;
        this.religionName = options.religionName || '';
        this.cpEmail = options.cpEmail || '';
        this.cpAddress = options.cpAddress || '';
        this.customerId = options.customerId || '';
        this.customerName = options.customerName || '';
        this.designation = options.designation || '';
        this.fatherName = options.fatherName || '';
        this.motherName = options.motherName || '';
        this.spouseName = options.spouseName || '';
        this.permanentAddress = options.permanentAddress || '';
        this.presentAddress = options.presentAddress || '';
        this.nid = options.nid || '';
        this.nationality = options.nationality || '';
        this.telephone = options.telephone || '';
        this.mobile = options.mobile || '';
        this.email = options.email || '';
        this.contactPerson = options.contactPerson || '';
        this.contactPerson = options.contactPerson || '';
        this.cpMobile = options.cpMobile || '';
        this.officeAddress = options.officeAddress || '';
        this.customerPictureName = options.customerPictureName || '';
        this.password = options.password || '';
        this.customProfilePhoto = options.customProfilePhoto || '';

        this.dob = options.dob ? new Date(options.dob) : null;
        // this.dob = options.dob || null;


    }
}
