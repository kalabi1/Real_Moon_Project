export class FlatSize {
    flatType: string;
    sizeNo: number;
    projectNo: number;
    flatSize: number;

    constructor(options: any = {}) {
        this.flatType = options.flatType || '';
        this.sizeNo = options.sizeNo || null;
        this.projectNo = options.projectNo || null;
        this.flatSize = options.flatSize || null;
    }
}
