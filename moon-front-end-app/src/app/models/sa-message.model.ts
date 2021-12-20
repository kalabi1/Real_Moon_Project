export class SaMessage {
    messageNo: number;
    activeFlag: number;
    messageType: string;
    message: string;
    messengerName: string;
    messengerDesig: string;
    messengerPhotoName: string;
    companyNo: number;
    ssCreatedOn: Date;
    ssCreator: number;
    ssModifiedOn: Date;
    ssModifier: number;

    constructor(options: any = {}) {
        this.messageNo = options.messageNo || null;
        this.activeFlag = options.activeFlag || null;
        this.companyNo = options.companyNo || null;
        this.messageType = options.messageType || '';
        this.message = options.message || '';
        this.messengerName = options.messengerName || '';
        this.messengerDesig = options.messengerDesig || '';
        this.messengerPhotoName = options.messengerPhotoName || '';
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;
    }
}