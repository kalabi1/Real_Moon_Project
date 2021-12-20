export class RlItemInstallment {
    installmentNo: number;
    itemNo: number;
    installmentAmount: number;

    constructor(options: any = {}) {
        this.installmentNo = options.installmentNo || null;
        this.itemNo = options.itemNo || null;
        this.installmentAmount = options.installmentAmount || null;

    }
}
