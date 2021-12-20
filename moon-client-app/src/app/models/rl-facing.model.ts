export class RlFacing {
    facingNo: number;
    facingName: string;

    constructor(options: any = {}) {
        this.facingNo = options.facingNo || null;
        this.facingName = options.facingName || '';
    }
}