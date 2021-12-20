import { Item } from './../../../models/project.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { acConfig } from '../../../app.config';
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html'
})
export class ProjectDetailsComponent implements OnInit {
  public projectObj: Item;
  public sliderbaseUrl;
  public sliderList: any = [];
  public rlitemInstallmentList: any = [];
  public videosList: any = [];
  public featureItemList: any = [];
  public sliderActiveIndex = 0;
  uuid: string;
  projectPhoto = '';
  public itemList: any = [];
  public curPage = 1;
  mosqueFlagvalue: string;
  hospitalFlagvalue: string;
  marketFlagvalue: string;
  conventionCenterFlagvalue: string;
  eduInstituteFlagvalue: string;
  fireAndSafetyAapFlagvalue: string;
  substationFlagvalue: string;
  pumpHouseFlagvalue: string;
  projectSecurityOfficeFlagvalue: string;

  constructor(private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.projectObj = new Item();

  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.sliderbaseUrl = acConfig.fileUrl;
    if (id) {
      this.getProject(id);
      this.getItemList(id);

    }
  }
  getProject(id) {
    this.http.get(`${acConfig.apiUrl}/rl/cu/project/details`, {
      params: {
        projectNo: id
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.projectObj = new Item(response.body);
        console.log("projectObj", this.projectObj);
        this.projectPhoto = this.sliderbaseUrl + this.projectObj.projectLayoutPhoto;

        if (this.projectObj.mosqueFlag === 1) {
          this.mosqueFlagvalue = 'Yes'
        } else {
          this.mosqueFlagvalue = 'No'
        };
        if (this.projectObj.hospitalFlag === 1) {
          this.hospitalFlagvalue = 'Yes'
        } else {
          this.hospitalFlagvalue = 'No'
        };
        if (this.projectObj.marketFlag === 1) {
          this.marketFlagvalue = 'Yes'
        } else {
          this.marketFlagvalue = 'No'
        };
        if (this.projectObj.conventionCenterFlag === 1) {
          this.conventionCenterFlagvalue = 'Yes'
        } else {
          this.conventionCenterFlagvalue = 'No'
        };
        if (this.projectObj.eduInstituteFlag === 1) {
          this.eduInstituteFlagvalue = 'Yes'
        } else {
          this.eduInstituteFlagvalue = 'No'
        };
        if (this.projectObj.fireAndSafetyAapFlag === 1) {
          this.fireAndSafetyAapFlagvalue = 'Yes'
        } else {
          this.fireAndSafetyAapFlagvalue = 'No'
        };
        if (this.projectObj.substationFlag === 1) {
          this.substationFlagvalue = 'Yes'
        } else {
          this.substationFlagvalue = 'No'
        };
        if (this.projectObj.pumpHouseFlag === 1) {
          this.pumpHouseFlagvalue = 'Yes'
        } else {
          this.pumpHouseFlagvalue = 'No'
        };
        if (this.projectObj.projectSecurityOfficeFlag === 1) {
          this.projectSecurityOfficeFlagvalue = 'Yes'
        } else {
          this.projectSecurityOfficeFlagvalue = 'No'
        };
      })
      .catch(console.log);
  }
  getItemList(id) {
    this.http.get(`${acConfig.apiUrl}/rl/cu/item/`, {
      params: {
        projectNo: id
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.itemList = JSON.parse(JSON.stringify(response.body)).map(element => {
          element['itemBrandPhoto'] = this.sliderbaseUrl + element.itemBrandPhoto;
          return element;
        });
        if (this.projectObj.projectType.toUpperCase() === 'R') {
          this.projectObj.projectType = 'Residential'
        } else if (this.projectObj.projectType.toUpperCase() === 'C') {
          this.projectObj.projectType = 'Commercial'
        } else if (this.projectObj.projectType.toUpperCase() === 'CO') {
          this.projectObj.projectType = 'Condominium'
        };
      })
      .catch(console.log);
  }
  onClickMoreDetail(itemNo) {
    this.getProject(itemNo);
  }
}
