import { Component, OnInit } from '@angular/core';
import { acConfig } from '../../../../../app.config';
import { HttpClient } from '@angular/common/http';
import { Sa1009Service } from '../../../../../services/sa1009/sa1009-service';
import { ToastrService } from 'ngx-toastr';
import { SaRegion } from '../../../../../models/sa-region.model';
import { AlertService } from '../../../../../core/popup/service/alert.service';

@Component({
  selector: 'app-sa1009',
  templateUrl: './sa1009.component.html'
})
export class SA1009Component implements OnInit {
  public regionList = new Array<SaRegion>();
  public subregionList = new Array<SaRegion>();
  public selectedRegionNo: number;
  public regionActiveIndex = 0;
  public subregionActiveIndex = 0;

  constructor(private http: HttpClient,
    private toastr: ToastrService,
    private alertService: AlertService,
    private sa1009Service: Sa1009Service) { }

  ngOnInit() {
    this.getRegionList();
  }


  getRegionList() {
    this.http.get(`${acConfig.apiUrl}/sa/setting/region/`, {
      params: {
        // projectNo: '84'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.regionList.length = 0;
        this.regionList = JSON.parse(JSON.stringify(response.body));
        this.selectedRegionNo = this.regionList[0].regionNo;
        this.getSubregionList(this.regionList[0].regionNo);
      })
      .catch(console.log);
  }

  getSubregionList(regionNo) {
    this.http.get(`${acConfig.apiUrl}/sa/setting/subregion/list`, {
      params: {
        regionNo: regionNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.subregionList.length = 0;
        this.subregionList = JSON.parse(JSON.stringify(response.body));

      })
      .catch(console.log);
  }

  onClickSelectRegion(regionNo, i) {
    this.regionActiveIndex = i;
    this.selectedRegionNo = regionNo;
    if (regionNo) {
      this.getSubregionList(regionNo)
    }
  }

  onClickSelectSubRegion(i) {
    this.subregionActiveIndex = i;
  }

  // Save Region
  onClickSaveRegionList() {
    this.sa1009Service.saveRegionList(this.regionList).subscribe(
      result => {
        this.regionList = result;
        this.toastr.success('Saved successfully ');
      },
      err => {
        // Do stuff whith your error
        if (err.text === 'insert successful') {
          this.toastr.success('Saved successfully ');
        }
        this.toastr.error('Unable to save');
      },
      () => {
        // Do stuff after completion
      }
    );
  }

  // Save Sub Region
  onClickSaveSubRegionList() {
    this.sa1009Service.saveSubregionList(this.subregionList).subscribe(
      result => {
        this.subregionList = result;
        this.toastr.success('Saved successfully ');
      },
      err => {
        // Do stuff whith your error
        if (err.text === 'insert successful') {
          this.toastr.success('Saved successfully ');
        }
        this.toastr.error('Unable to save');
      },
      () => {
        // Do stuff after completion
      }
    );
  }

  // Add New Region
  onClickAddNewRegion() {
    this.regionList.push(new SaRegion());
  }

  // Add New Sub Region
  onClickAddNewSubRegion() {
    if (!this.selectedRegionNo) {
      this.toastr.success('First Save Region Information');
      return true;
    }
    let element = {
      regionNo: this.selectedRegionNo
    };
    this.subregionList.push(new SaRegion(element));
  }


  onClickDeleteRegion(regionNo, index) {
    if (regionNo) {
      this.alertService.danger("Do you want to delete ?", true).then(data => {
        if (data) {
          this.sa1009Service.deleteRegion(regionNo).subscribe(result => {
            this.regionList.splice(index, 1);
            this.toastr.success('Deleted Successfully');
          }, err => {
            this.toastr.error('Unable to Delete');
            console.log(err);
          });
        }
      })
    } else {
      this.regionList.splice(index, 1);
    }
  }

  onClickDeleteSubRegion(subregionNo, index) {
    if (subregionNo) {
      this.alertService.danger("Do you want to delete ?", true).then(data => {
        if (data) {
          this.sa1009Service.deleteSubregion(subregionNo).subscribe(result => {
            this.subregionList.splice(index, 1);
            this.toastr.success('Deleted Successfully');
          }, err => {
            this.toastr.error('Unable to Delete');
            console.log(err);
          });
        }
      })
    } else {
      this.subregionList.splice(index, 1);
    }
  }
}
