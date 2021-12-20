import { acConfig } from '../../app.config';
const API_URL = acConfig.apiUrl

let userInfo = {
  active: false,
  email: '',
  id: null,
  mobile: "",
  name: "",
  owner: null,
};

let companyInfo = {
  activeStat: null,
  companyAdd1_Bangla: '',
  companyAdd2_Bangla: '',
  companyAddr1: '',
  companyAddr2: '',
  companyAlias: '',
  companyAliasBangla: '',
  companyCountry: '',
  companyDeveloper: '',
  companyEmail: '',
  companyFaviconName: '',
  companyFax: '',
  companyId: '',
  companyLatestNews: '',
  companyLogo: '',
  companyLogoName: '',
  companyLogoWeburl: '',
  companyMobile: '',
  companyName: '',
  companyNameBangla: '',
  companyNo: null,
  companyPhone: '',
  companySlogan: '',
  companyWebsite: '',
  ercDate: '',
  ercNo: '',
  groupFlag: null,
  ircNo: '',
  licenseNo: '',
  office1Address: '',
  office1Email: '',
  office1MobileNo: '',
  office1TelephoneNo: '',
  office2Address: '',
  office2Email: '',
  office2MobileNo: '',
  office2TelephoneNo: '',
  office3Address: '',
  office3Email: '',
  office3MobileNo: '',
  office3TelephoneNo: '',
  officeTime: '',
  repFooter1: '',
  repFooter2: '',
  repFooterDev: '',
  tinNo: '',
  vatRegNo: ""
}

let psDateFormat = {
  showWeekNumbers: false,
  dateInputFormat: "DD/MM/YYYY",
}

export const globalVariables: any = {
  psDateFormat: psDateFormat,
  API_URL: API_URL,
  userInfo: userInfo,
  companyInfo: companyInfo,
}