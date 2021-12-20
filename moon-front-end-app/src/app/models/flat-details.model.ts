export class FlatDetails {
    bedRoom: number;
    approvalNo: number;
    blockName: string;
    projectType: string;
    decorationCondition: string;
    facingNo: number;
    flatNo: number;
    flatPlaceofStorid: number;
    flatSize: number;
    gym: number;
    itemNo: number;
    projectTypeNo: number;
    itemType: number;
    kitchen: number;
    livingAndDining: number;
    numberOfLift: number;
    parkingFlag: number;
    parkingPrice: number;
    plotSize: number;
    plotType: number;
    price: number;
    projectNo: number;
    roadSize: string;
    swimmingPool: number;
    toilets: number;
    totalPrice: number;
    itemId: string;
    itemName: string;
    numberOfBalcony: number;
    itemTypeNo: number;
    flatType: string;
    projectLocation: string;
    blockNameFrom: string;
    blockNameTo: string;
    multipartFile: string;
    videoTitle: string;
    youtubeVideoLink: string;
    projectName: string;
    approvalId: string;
    projectId: string;
    descr: string;
    descrBn: string;
    projectTypeName: string;
    approvalInformation: string;
    itemBrandPhoto: string;
    projectLayoutPhoto: string;
    projectStatus: string;
    projectRegion: string;
    itemTypeName: string;
    others: string;
    facingName: string;
    uomShort: string;
    securityFlag: number;
    cctvFlag: number;
    conferenceHallFlag: number;
    heatingFlag: number;
    coolingFlag: number;
    builtYear: number;
    discountAmount: number;
    termsAndCondition: number;
    termsAndConditionBn: number;
    discountPct: number;
    internetFlag: number;
    cableTvFlag: number;
    netPrice: number;
    videoNo: number;
    plotNo: number;
    generalPlotNo: number;
    commercialPlotNo: number;
    duplexPlotNo: number;
    numberOfPlot: number;
    publishFlag: number;
    uomNo: number;
    regionNo: number;
    subregionNo: number;
    roadSide: number;
    positionNo: number;
    mosqueFlag: number;
    hospitalFlag: number;
    marketFlag: number;
    conventionCenterFlag: number;
    eduInstituteFlag: number;
    fireStationFlag: number;
    substationFlag: number;
    pumpHouseFlag: number;
    projectSecurityOfficeFlag: number;
    powerDivisionAapFlag: number;
    municipalityAapFlag: number;
    wasaAapFlag: number;
    gasAapFlag: number;
    fireAndSafetyAapFlag: number;
    deptOfEnvAapFlag: number;
    civilAviationAapFlag: number;
    policeStationAapFlag: number;
    trafficControlAuthAapFlag: number;
    wordCommAapFlag: number;
    roadNo: number;
    bookingMoney: number;
    priceNegotiableFlag: number;



    constructor(options: any = {}) {
        this.powerDivisionAapFlag = options.powerDivisionAapFlag || null;
        this.bedRoom = options.bedRoom || null;
        this.municipalityAapFlag = options.municipalityAapFlag || null;
        this.roadNo = options.roadNo || null;
        this.bookingMoney = options.bookingMoney || null;
        this.priceNegotiableFlag = options.priceNegotiableFlag || 0;
        this.civilAviationAapFlag = options.civilAviationAapFlag || 0;
        this.wasaAapFlag = options.wasaAapFlag || 0;
        this.wordCommAapFlag = options.wordCommAapFlag || 0;
        this.gasAapFlag = options.gasAapFlag || 0;
        this.fireAndSafetyAapFlag = options.fireAndSafetyAapFlag || 0;
        this.deptOfEnvAapFlag = options.deptOfEnvAapFlag || 0;
        this.policeStationAapFlag = options.policeStationAapFlag || 0;
        this.trafficControlAuthAapFlag = options.trafficControlAuthAapFlag || 0;
        this.approvalNo = options.approvalNo || null;
        this.mosqueFlag = options.mosqueFlag || null;
        this.hospitalFlag = options.hospitalFlag || null;
        this.marketFlag = options.marketFlag || null;
        this.conventionCenterFlag = options.conventionCenterFlag || null;
        this.eduInstituteFlag = options.eduInstituteFlag || null;
        this.fireStationFlag = options.fireStationFlag || null;
        this.substationFlag = options.substationFlag || null;
        this.pumpHouseFlag = options.pumpHouseFlag || null;
        this.projectSecurityOfficeFlag = options.projectSecurityOfficeFlag || null;
        this.itemTypeNo = options.itemTypeNo || null;
        this.others = options.others || '';
        this.blockName = options.blockName || '';
        this.uomShort = options.uomShort || '';
        this.projectType = options.projectType || '';
        this.projectStatus = options.projectStatus || '';
        this.decorationCondition = options.decorationCondition || '';
        this.approvalInformation = options.approvalInformation || '';
        this.facingName = options.facingName || '';
        this.itemBrandPhoto = options.itemBrandPhoto || '';
        this.projectLayoutPhoto = options.projectLayoutPhoto || '';
        this.facingNo = options.facingNo || null;
        this.positionNo = options.positionNo || null;
        this.flatNo = options.flatNo || null;
        this.subregionNo = options.subregionNo || null;
        this.flatPlaceofStorid = options.flatPlaceofStorid || null;
        this.flatSize = options.flatSize || null;
        this.gym = options.gym || (options.gym == 0) ? 0 : null;
        this.itemId = options.itemId || "";
        this.flatType = options.flatType || "";
        this.itemTypeName = options.itemTypeName || "";
        this.projectLocation = options.projectLocation || "";
        this.projectRegion = options.projectRegion || "";
        this.itemNo = options.itemNo || null;
        this.regionNo = options.regionNo || null;
        this.projectTypeNo = options.projectTypeNo || null;
        this.plotNo = options.plotNo || null;
        this.itemType = options.itemType || null;
        this.kitchen = options.kitchen || null;
        this.livingAndDining = options.livingAndDining || null;
        this.numberOfLift = options.numberOfLift || null;
        this.parkingFlag = (options.parkingFlag) || (options.parkingFlag == 0 ? 0 : null);
        this.parkingPrice = options.parkingPrice || null;
        this.uomNo = options.uomNo || null;
        this.roadSide = options.roadSide || null;
        this.plotSize = options.plotSize || null;
        this.plotType = options.plotType || null;
        this.price = options.price || null;
        this.projectNo = options.projectNo || null;

        this.swimmingPool = options.swimmingPool || null;
        this.toilets = options.toilets || null;
        this.totalPrice = options.totalPrice || null;
        this.numberOfBalcony = options.numberOfBalcony || null;
        this.blockNameFrom = options.blockNameFrom || '';
        this.blockNameTo = options.blockNameTo || '';
        this.multipartFile = options.multipartFile || '';
        this.roadSize = options.roadSize || '';
        this.videoTitle = options.videoTitle || '';
        this.youtubeVideoLink = options.youtubeVideoLink || '';
        this.projectName = options.projectName || '';
        this.approvalId = options.approvalId || '';
        this.termsAndCondition = options.termsAndCondition || '';
        this.termsAndConditionBn = options.termsAndConditionBn || '';
        this.projectId = options.projectId || '';
        this.itemName = options.itemName || '';
        this.descr = options.descr || '';
        this.descrBn = options.descrBn || '';
        this.projectTypeName = options.projectTypeName || '';
        this.securityFlag = options.securityFlag || null;
        this.cctvFlag = options.cctvFlag || null;
        this.conferenceHallFlag = options.conferenceHallFlag || null;
        this.heatingFlag = options.heatingFlag || null;
        this.coolingFlag = options.coolingFlag || null;
        this.builtYear = options.builtYear || null;
        this.discountAmount = options.discountAmount || null;
        this.discountPct = options.discountPct || null;
        this.internetFlag = options.internetFlag || null;
        this.cableTvFlag = options.cableTvFlag || null;
        this.netPrice = options.netPrice || null;
        this.videoNo = options.videoNo || null;
        this.generalPlotNo = options.generalPlotNo || null;
        this.commercialPlotNo = options.commercialPlotNo || null;
        this.duplexPlotNo = options.duplexPlotNo || null;
        this.numberOfPlot = options.numberOfPlot || null;
        this.publishFlag = options.publishFlag || 0;
    }
}