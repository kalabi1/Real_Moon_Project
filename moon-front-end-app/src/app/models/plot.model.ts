export class Plot {
    approvalNo: number;
    blockNameFrom: string;
    blockNameTo: string;
    blockName: string;
    itemId: string;
    carParking: number;
    descr: string;
    facingNo: number;
    handOverTime: Date;
    landArea: number;
    noOfFlat: number;
    noOfLift: number;
    noOfStoried: number;
    openSpace: number;
    plotSize: number;
    projectId: string;
    projectLocation: string;
    projectName: string;
    decorationCondition: string;
    projectNo: number;
    projectType: string;
    flatSize: number;
    flatNo: number;
    flatPlaceofStorid: number;
    gym: number;
    itemNo: number;
    itemType: number;
    kitchen: number;
    livingAndDining: number;
    numberOfLift: number;
    parkingFlag: number;
    parkingPrice: number;
    plotType: number;
    roadSize: string;
    videoNo: number;
    swimmingPool: number;
    projectTypeNo: number;
    videoTitle: string;
    approvalInformation: string;
    youtubeVideoLink: string;
    projectLayoutPhoto: string;
    itemBrandPhoto: string;
    projectStatus: string;
    projectRegion: string;
    builtYear: number;
    discountAmount: number;
    netPrice: number;
    plotNo: number;
    publishFlag: number;
    uomNo: number;
    ssCreatedOn: Date;
    ssCreator: number;
    ssModifiedOn: Date;
    ssModifier: number;


    constructor(options: any = {}) {
        this.approvalNo = options.approvalNo || null;
        this.videoTitle = options.videoTitle || '';
        this.youtubeVideoLink = options.youtubeVideoLink || '';
        this.projectLayoutPhoto = options.projectLayoutPhoto || '';
        this.itemBrandPhoto = options.itemBrandPhoto || '';
        this.blockNameFrom = options.blockNameFrom || '';
        this.blockNameTo = options.blockNameTo || '';
        this.blockName = options.blockName || '';
        this.itemId = options.itemId || '';
        this.carParking = options.carParking || null;
        this.descr = options.descr || '';
        this.handOverTime = options.handOverTime ? new Date(options.handOverTime) : null;
        this.projectRegion = options.projectRegion || '';
        this.noOfFlat = options.noOfFlat || null;
        this.plotNo = options.plotNo || null;
        this.noOfLift = options.noOfLift || null;
        this.landArea = options.landArea || null;
        this.projectStatus = options.projectStatus || null;
        this.noOfStoried = options.noOfStoried || null;
        this.plotSize = options.plotSize || null;
        this.projectId = options.projectId || null;
        this.projectLocation = options.projectLocation || '';
        this.projectName = options.projectName || "";
        this.decorationCondition = options.decorationCondition || "";
        this.projectNo = options.projectNo || null;
        this.projectType = options.projectType || "";
        this.approvalInformation = options.approvalInformation || "";
        this.projectRegion = options.projectRegion || "";
        this.openSpace = options.openSpace || null;
        this.facingNo = options.facingNo || null;
        this.flatSize = options.flatSize || null;
        this.flatNo = options.flatNo || null;
        this.flatPlaceofStorid = options.flatPlaceofStorid || null;
        this.gym = options.gym || null;
        this.uomNo = options.uomNo || null;
        this.itemNo = options.itemNo || null;
        this.itemType = options.itemType || null;
        this.kitchen = options.kitchen || null;
        this.livingAndDining = options.livingAndDining || null;
        this.numberOfLift = options.numberOfLift || null;
        this.parkingFlag = options.parkingFlag || null;
        this.parkingPrice = options.parkingPrice || null;
        this.plotType = options.plotType || null;
        this.roadSize = options.roadSize || '';
        this.projectTypeNo = options.projectTypeNo || null;
        this.swimmingPool = options.swimmingPool || null;
        this.videoNo = options.videoNo || null;
        this.builtYear = options.builtYear || null;
        this.discountAmount = options.discountAmount || null;
        this.netPrice = options.netPrice || null;
        this.publishFlag = options.publishFlag || 0;
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;
    }
}