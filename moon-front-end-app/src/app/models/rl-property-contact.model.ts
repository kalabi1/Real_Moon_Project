export class RlPropertyContact {
    contactNo: number;
    itemNo: number;
    cpName: string;
    cpEmail: string;
    cpMobile: string;
    cpComments: string;
    contactDate: Date;
    readFlag: number;

    constructor(options: any = {}) {
        this.contactNo = options.contactNo || null;
        this.itemNo = options.itemNo || null;
        this.cpName = options.cpName || '';
        this.cpEmail = options.cpEmail || '';
        this.cpMobile = options.cpMobile || '';
        this.cpComments = options.cpComments || '';
        this.contactDate = options.contactDate ? new Date(options.contactDate) : null;
        this.readFlag = options.readFlag || null;
    }
}
