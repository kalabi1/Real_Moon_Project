export class RlCollection
 {
    collNo: number;
    trnNo: number;
    collId: string;
    customerId: string;
    collDate: Date;
    customerNo: number;
    balance: number;
    dueAmount: number;
    installmentNo: number;
    paidAmount: number;
    descr: string;
    payMode: string;
    bankNo: string;
    branchNo: string;
    mrNo: string;
    refTrnNo: string;
    cqDate: Date;
    cqNo: string;
    customerName: string;
    ssCreatedOn: Date;
    ssCreator: number;
    ssModifiedOn: Date;
    ssModifier: number;

    constructor(options: any = {}) {

        this.collNo = options.collNo || null;
        this.trnNo = options.trnNo || null;
        this.customerNo = options.customerNo || null;
        this.balance = options.balance || null;
        this.dueAmount = options.dueAmount || null;
        this.installmentNo = options.installmentNo || null;
        this.collId = options.collId || '';
        this.descr = options.descr || '';
        this.mrNo = options.mrNo || '';
        this.refTrnNo = options.refTrnNo || '';
        this.customerId = options.customerId || '';
        this.customerName = options.customerName || '';
        this.payMode = options.payMode || '';
        this.bankNo = options.bankNo || '';
        this.branchNo = options.branchNo || '';
        this.cqNo = options.cqNo || '';
        this.collDate = options.collDate ? new Date(options.collDate) : null;
        this.cqDate = options.cqDate ? new Date(options.cqDate) : null;
        this.paidAmount = options.paidAmount || null;
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;

    }
}
