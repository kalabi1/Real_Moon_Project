export class RlConfig {

    // flatType: string;
    sl: number;
    displayFeatureListNumber: number;
    contactMailSendTo: Array<string> = [];
    contactMailSendCc: Array<string> = [];
    contactMailSendBcc: Array<string> = [];

    constructor(options: any = {}) {
        // this.flatType = options.flatType || '';
        this.sl = options.sl || null;
        this.displayFeatureListNumber = options.displayFeatureListNumber || null;
        this.contactMailSendTo = options.contactMailSendTo || '';
        this.contactMailSendCc = options.contactMailSendCc || '';
        this.contactMailSendBcc = options.contactMailSendBcc || '';
       
    }
}
