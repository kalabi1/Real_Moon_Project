import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../app.config'
import { SaCompany } from './../../../models/sa-company.model';

import { setTheme } from 'ngx-bootstrap/utils';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public itemList: any = [];
  public itemListBackup: any = [];
  public sliderbaseUrl;
  public sliderList: any = [];
  public regionList: any = []
  public subregionList: any = []
  public company = new SaCompany();
  filterNo = 0;
  public curPage = 1;

  public myInterval = 2000;


  constructor(private http: HttpClient) {
    setTheme('bs4');
  }

  ngOnInit() {
    this.getCompanyInformation();
    this.sliderbaseUrl = acConfig.fileUrl;
    this.getItemList();
    this.getRegionList();
  }

  getItemList() {
    this.http.get(`${acConfig.apiUrl}/rl/cu/item/`, {
      params: {
        itemInventoryFlag: '0'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.itemList = JSON.parse(JSON.stringify(response.body)).map(element => {
          element['itemBrandPhoto'] = this.sliderbaseUrl + element.itemBrandPhoto;
          return element;
        });
        this.itemListBackup = JSON.parse(JSON.stringify(this.itemList));
      })
      .catch(console.log);
  }

  itemName = '';
  itemLocation = '';
  minArea = '';
  maxArea = '';
  bathroom = '';
  bedroom = '';
  priceTo = '';
  priceFrom = '';
  itemTypeNo: any = '';
  itemInventoryFlag: any = '0';
  projectType: any = '';
  projectStatus: any = '';
  regionNo: any = '';
  subregionNo: any = '';

  onClickSearch() {

    this.http.get(`${acConfig.apiUrl}/rl/cu/item/`, {
      params: {
        itemName: this.itemName,
        projectLocation: this.itemLocation,
        itemTypeNo: this.itemTypeNo,
        bedRoom: this.bedroom,
        sizeFrom: this.minArea,
        sizeTo: this.maxArea,
        priceFrom: this.priceFrom,
        priceTo: this.priceTo,
        itemInventoryFlag: this.itemInventoryFlag,
        projectType: this.projectType,
        projectStatus: this.projectStatus,
        regionNo: this.regionNo,
        subregionNo: this.subregionNo

      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.itemList = JSON.parse(JSON.stringify(response.body)).map(element => {
          element['itemBrandPhoto'] = this.sliderbaseUrl + element.itemBrandPhoto;
          return element;
        });
      })
      .catch(console.log);

  }
  getRegionList() {
    this.http.get(`${acConfig.apiUrl}/sa/setting/region/`, {
      params: {
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.regionList = response.body;
      })
      .catch(console.log);
  }

  onChangeGetSubRegionList() {
    this.http.get(`${acConfig.apiUrl}/sa/setting/subregion/list`, {
      params: {
        regionNo: this.regionNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.subregionList = response.body;
      })
      .catch(console.log);
  }


  getSliderList(companyNo) {
    this.http.get(`${acConfig.apiUrl}/sa/company/slider/get-company-wise`, {
      params: {
        companyNo: companyNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.sliderList = JSON.parse(JSON.stringify(response.body)).map(element => {
          element['imagePath'] = this.sliderbaseUrl + element.sliderName;
          return element;
        });
      })
      .catch(console.log);
  }

  getCompanyInformation() {
    this.http.get(`${acConfig.apiUrl}/sa/company/get-company`, {
      params: {
        companyNo: '1'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        console.log("response", response);
        this.company = new SaCompany(response.body);
        this.getSliderList(this.company.companyNo);
      })
      .catch(console.log);
  }
}


