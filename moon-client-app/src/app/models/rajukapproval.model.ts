export class RajukApproval {
    approvalId: string;
    descr: string;
    approvalNo: number;

    constructor(options: any = {}) {
        this.approvalId = options.approvalId || '';
        this.descr = options.descr || '';
        this.approvalNo = options.approvalNo || null;
    }
}
