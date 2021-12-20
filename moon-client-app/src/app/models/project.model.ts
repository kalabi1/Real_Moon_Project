export class Item {
  itemNo: number;
  itemId: string;
  transactionId: string;
  projectNo: number;
  settlementPrice: number;
  bookingRefPerson: string;
  refContactNo: number;
  bankAccNo: number;
  payMode: number;
  bookingAmount: number;
  paymentType: number;
  plotType: string;
  branchName: string;
  roadSisdeName: string;
  bankName: string;
  roadSize: number;
  roadSizeNo: number;
  facingNo: number;
  blockName: string;
  plotSize: number;
  price: number;
  bookingMoney: number;
  priceNegotiableFlag: number;
  totalPrice: number;
  flatSize: number;
  flatPlaceofStorid: number;
  flatNo: number;
  numberOfLift: number;
  decorationCondition: string;
  bedRoom: number;
  livingAndDining: number;
  kitchen: number;
  varanda: number;
  toilets: number;
  mosqueFlag: number;
  priceNegotiableFlagvalue: number;
  hospitalFlag: number;
  marketFlag: number;
  conventionCenterFlag: number;
  eduInstituteFlag: number;
  fireAndSafetyAapFlag: number;
  substationFlag: number;
  pumpHouseFlag: number;
  projectSecurityOfficeFlag: number;
  swimmingPool: number;
  gym: number;
  parkingFlag: number;
  parkingPrice: number;
  itemTypeNo: number;
  flatType: number;
  itemBrandPhoto: string;
  itemInventoryFlag: number;
  itemName: string;
  descr: string;
  descrBn: string;
  inactiveFlag: number;
  cctvFlag: number;
  conferenceHallFlag: number;
  heatingFlag: number;
  coolingFlag: number;
  numberOfBalcony: number;
  builtYear: number;
  discountAmount: number;
  priceNegotiable: number;
  internetFlag: number;
  netPrice: number;
  landArea: number;
  noOfStoried: number;
  cableTvFlag: number;
  noOfLift: number;
  carParking: number;
  powerDivisionAapFlag: number;
  municipalityAapFlag: number;
  wasaAapFlag: number;
  unionCouncileAapFlag: number;
  deptOfEnvAapFlag: number;
  policeStationAapFlag: number;
  trafficControlAuthAapFlag: number;
  wordCommAapFlag: number;
  civilAviationAapFlag: number;
  noOfFlat: number;
  openSpace: number;
  roadSide: number;
  gasAapFlag: number;
  itemTypeName: string;
  projectId: string;
  projectLocation: string;
  projectType: string;
  projectTypeName: string;
  approvalId: string;
  uomShort: string;
  projectName: string;
  blockNameFrom: string;
  blockNameTo: string;
  projectTypeNo: string;
  projectLayoutPhoto: string;
  facingName: string;
  approvalInformation: string;
  termsAndCondition: string;
  handOverTime: Date;
  termsAndConditionBn: string;
  positionName: string;
  projectStatus: string;
  aprovalinfo: string;

  constructor(options: any = {}) {
    this.projectTypeNo = options.projectTypeNo || (options.projectTypeNo === 0 ? 0 : null);
    this.openSpace = options.openSpace || (options.openSpace === 0 ? 0 : null);
    this.settlementPrice = options.settlementPrice || (options.settlementPrice === 0 ? 0 : null);
    this.bankAccNo = options.bankAccNo || (options.bankAccNo === 0 ? 0 : null);
    this.bookingRefPerson = options.bookingRefPerson || '';
    this.bankName = options.bankName || '';
    this.projectStatus = options.projectStatus || '';
    this.transactionId = options.transactionId || '';
    this.branchName = options.branchName || '';
    this.refContactNo = options.refContactNo || (options.refContactNo === 0 ? 0 : null);
    this.bookingAmount = options.bookingAmount || (options.bookingAmount === 0 ? 0 : null);
    this.priceNegotiableFlagvalue = options.priceNegotiableFlagvalue || (options.priceNegotiableFlagvalue === 0 ? 0 : null);
    this.payMode = options.payMode || '';
    this.paymentType = options.paymentType || (options.paymentType === 0 ? 0 : null);
    this.roadSizeNo = options.roadSizeNo || (options.roadSizeNo === 0 ? 0 : null);
    this.noOfLift = options.noOfLift || (options.noOfLift === 0 ? 0 : null);
    this.carParking = options.carParking || (options.carParking === 0 ? 0 : null);
    this.unionCouncileAapFlag = options.unionCouncileAapFlag || (options.unionCouncileAapFlag === 0 ? 0 : null);
    this.wasaAapFlag = options.wasaAapFlag || (options.wasaAapFlag === 0 ? 0 : null);
    this.municipalityAapFlag = options.municipalityAapFlag || (options.municipalityAapFlag === 0 ? 0 : null);
    this.powerDivisionAapFlag = options.powerDivisionAapFlag || (options.powerDivisionAapFlag === 0 ? 0 : null);
    this.wordCommAapFlag = options.wordCommAapFlag || (options.wordCommAapFlag === 0 ? 0 : null);
    this.trafficControlAuthAapFlag = options.trafficControlAuthAapFlag || (options.trafficControlAuthAapFlag === 0 ? 0 : null);
    this.policeStationAapFlag = options.policeStationAapFlag || (options.policeStationAapFlag === 0 ? 0 : null);
    this.civilAviationAapFlag = options.civilAviationAapFlag || (options.carPacivilAviationAapFlagrking === 0 ? 0 : null);
    this.policeStationAapFlag = options.policeStationAapFlag || (options.policeStationAapFlag === 0 ? 0 : null);
    this.civilAviationAapFlag = options.civilAviationAapFlag || (options.civilAviationAapFlag === 0 ? 0 : null);
    this.deptOfEnvAapFlag = options.deptOfEnvAapFlag || (options.deptOfEnvAapFlag === 0 ? 0 : null);
    this.fireAndSafetyAapFlag = options.fireAndSafetyAapFlag || (options.fireAndSafetyAapFlag === 0 ? 0 : null);
    this.noOfFlat = options.noOfFlat || (options.noOfFlat === 0 ? 0 : null);
    this.noOfStoried = options.noOfStoried || (options.noOfStoried === 0 ? 0 : null);
    this.landArea = options.landArea || (options.landArea === 0 ? 0 : null);
    this.itemNo = options.itemNo || (options.itemNo === 0 ? 0 : null);
    this.roadSide = options.roadSide || null;
    this.gasAapFlag = options.gasAapFlag || null;
    this.projectName = options.projectName || '';
    this.kitchen = options.kitchen || (options.kitchen === 0 ? 0 : null);
    this.projectNo = options.projectNo || (options.projectNo === 0 ? 0 : null);
    this.netPrice = options.netPrice || (options.netPrice === 0 ? 0 : null);
    this.facingNo = options.facingNo || (options.facingNo === 0 ? 0 : null);
    this.plotSize = options.plotSize || (options.plotSize === 0 ? 0 : null);
    this.price = options.price || (options.price === 0 ? 0 : null);
    this.priceNegotiableFlag = options.priceNegotiableFlag || (options.priceNegotiableFlag === 0 ? 0 : null);
    this.bookingMoney = options.bookingMoney || (options.bookingMoney === 0 ? 0 : null);
    this.priceNegotiable = options.priceNegotiable || (options.priceNegotiable === 0 ? 0 : null);
    this.totalPrice = options.totalPrice || (options.totalPrice === 0 ? 0 : null);
    this.flatSize = options.flatSize || (options.flatSize === 0 ? 0 : null);
    this.flatPlaceofStorid = options.flatPlaceofStorid || (options.flatPlaceofStorid === 0 ? 0 : null);
    this.roadSize = options.roadSize || (options.roadSize === 0 ? 0 : null);
    this.flatNo = options.flatNo || (options.flatNo === 0 ? 0 : null);
    this.numberOfLift = options.numberOfLift || (options.numberOfLift === 0 ? 0 : null);
    this.bedRoom = options.bedRoom || (options.bedRoom === 0 ? 0 : null);
    this.livingAndDining = options.livingAndDining || (options.livingAndDining === 0 ? 0 : null);
    this.varanda = options.varanda || (options.varanda === 0 ? 0 : null);
    this.toilets = options.toilets || (options.toilets === 0 ? 0 : null);
    this.mosqueFlag = options.mosqueFlag || (options.mosqueFlag === 0 ? 0 : null);
    this.hospitalFlag = options.hospitalFlag || (options.hospitalFlag === 0 ? 0 : null);
    this.marketFlag = options.marketFlag || (options.marketFlag === 0 ? 0 : null);
    this.conventionCenterFlag = options.conventionCenterFlag || (options.conventionCenterFlag === 0 ? 0 : null);
    this.eduInstituteFlag = options.eduInstituteFlag || (options.eduInstituteFlag === 0 ? 0 : null);
    this.fireAndSafetyAapFlag = options.fireAndSafetyAapFlag || (options.fireAndSafetyAapFlag === 0 ? 0 : null);
    this.substationFlag = options.substationFlag || (options.substationFlag === 0 ? 0 : null);
    this.pumpHouseFlag = options.pumpHouseFlag || (options.pumpHouseFlag === 0 ? 0 : null);
    this.projectSecurityOfficeFlag = options.projectSecurityOfficeFlag || (options.projectSecurityOfficeFlag === 0 ? 0 : null);
    this.swimmingPool = options.swimmingPool || (options.swimmingPool === 0 ? 0 : null);
    this.gym = options.gym || (options.gym === 0 ? 0 : null);
    this.parkingFlag = options.parkingFlag || (options.parkingFlag === 0 ? 0 : null);
    this.parkingPrice = options.parkingPrice || (options.parkingPrice === 0 ? 0 : null);
    this.itemTypeNo = options.itemTypeNo || (options.itemTypeNo === 0 ? 0 : null);
    this.flatType = options.flatType || (options.flatType === 0 ? 0 : null);
    this.itemInventoryFlag = options.itemInventoryFlag || (options.itemInventoryFlag === 0 ? 0 : null);
    this.inactiveFlag = options.inactiveFlag || (options.inactiveFlag === 0 ? 0 : null);
    this.cctvFlag = options.cctvFlag || (options.cctvFlag === 0 ? 0 : null);
    this.conferenceHallFlag = options.conferenceHallFlag || (options.conferenceHallFlag === 0 ? 0 : null);
    this.heatingFlag = options.heatingFlag || (options.heatingFlag === 0 ? 0 : null);
    this.coolingFlag = options.coolingFlag || (options.coolingFlag === 0 ? 0 : null);
    this.numberOfBalcony = options.numberOfBalcony || (options.numberOfBalcony === 0 ? 0 : null);
    this.builtYear = options.builtYear || (options.builtYear === 0 ? 0 : null);
    this.discountAmount = options.discountAmount || (options.discountAmount === 0 ? 0 : null);
    this.internetFlag = options.internetFlag || (options.internetFlag === 0 ? 0 : null);
    this.cableTvFlag = options.cableTvFlag || (options.cableTvFlag === 0 ? 0 : null);
    this.facingName = options.facingName || '';
    this.projectTypeName = options.projectTypeName || '';
    this.approvalId = options.approvalId || '';
    this.projectType = options.projectType || '';
    this.itemTypeName = options.itemTypeName || '';
    this.uomShort = options.uomShort || '';
    this.projectLocation = options.projectLocation || '';
    this.projectId = options.projectId || '';
    this.approvalInformation = options.approvalInformation || '';
    this.blockName = options.blockName || '';
    this.itemBrandPhoto = options.itemBrandPhoto || '';
    this.descr = options.descr || '';
    this.descrBn = options.descrBn || '';
    this.itemName = options.itemName || '';
    this.aprovalinfo = options.aprovalinfo || '';
    this.roadSisdeName = options.roadSisdeName || '';
    this.decorationCondition = options.decorationCondition || '';
    this.itemId = options.itemId || '';
    this.handOverTime = options.handOverTime ? new Date(options.handOverTime) : null;
    this.plotType = options.plotType || '';
    this.blockNameFrom = options.blockNameFrom || '';
    this.blockNameTo = options.blockNameTo || '';
    this.projectLayoutPhoto = options.projectLayoutPhoto || '';
    this.termsAndCondition = options.termsAndCondition || '';
    this.termsAndConditionBn = options.termsAndConditionBn || '';
    this.positionName = options.positionName || '';
  }
}
