import { Component, OnInit } from '@angular/core';
import { acConfig } from '../../../../../app.config';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from '../../../../../core/popup/service/alert.service';
import { HttpClient } from '@angular/common/http';
import { SaLookup } from '../../../../../models/sa-lookup.model';
import { Sa1004Service } from '../../../../../services/sa1004/sa1004-service';
import { SaLookupdtl } from '../../../../../models/sa-lookupdtl.model';

@Component({
  selector: 'app-sa1004',
  templateUrl: './sa1004.component.html'
})
export class SA1004Component implements OnInit {
  public lookupList = new Array<SaLookup>();
  public lookupdtlList = new Array<SaLookupdtl>();
  public selectedLookupNo: number;
  public lookupActiveIndex = 0;
  public lookupdtlActiveIndex = 0;

  constructor(private http: HttpClient, private toastr: ToastrService,
    private alertService: AlertService,
    private sa1004Service: Sa1004Service) { }

  ngOnInit() {
    this.getLookupList();
  }


  getLookupList() {
    this.http.get(`${acConfig.apiUrl}/sa/setting/lookup/`, {
      params: {
        // projectNo: '84'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.lookupList.length = 0;
        this.lookupList = JSON.parse(JSON.stringify(response.body));
        this.selectedLookupNo = this.lookupList[0].lookupNo;
        this.getLookupdtlList(this.lookupList[0].lookupNo);
      })
      .catch(console.log);
  }

  onClickSelectLookup(lookupNo, i) {
    this.lookupActiveIndex = i;
    this.selectedLookupNo = lookupNo;
    if (lookupNo) {
      this.getLookupdtlList(lookupNo)
    }
  }

  onClickDeleteLookup(lookupNo, index) {
    if (lookupNo) {
      this.alertService.danger("Do you want to delete ?", true).then(data => {
        if (data) {
          this.sa1004Service.deleteLookup(lookupNo).subscribe(result => {
            this.lookupList.splice(index, 1);
            this.toastr.success('Deleted Successfully');
          }, err => {
            this.toastr.error('Unable to Delete');
            console.log(err);
          });
        }
      })
    } else {
      this.lookupList.splice(index, 1);
    }
  }


  getLookupdtlList(lookupNo) {
    this.http.get(`${acConfig.apiUrl}/sa/setting/lookupdtl/list`, {
      params: {
        lookupNo: lookupNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.lookupdtlList.length = 0;
        this.lookupdtlList = JSON.parse(JSON.stringify(response.body));
      })
      .catch(console.log);
  }

  onClickDeleteLookupdtl(lookupdtlNo, index) {
    if (lookupdtlNo) {
      this.alertService.danger("Do you want to delete ?", true).then(data => {
        if (data) {
          this.sa1004Service.deleteLookupdtl(lookupdtlNo).subscribe(result => {
            this.lookupdtlList.splice(index, 1);
            this.toastr.success('Deleted Successfully');
          }, err => {
            this.toastr.error('Unable to Delete');
          });
        }
      })
    } else {
      this.lookupdtlList.splice(index, 1);
    }
  }

  // Save Region
  onClickSaveLookupList() {
    this.sa1004Service.saveLookupList(this.lookupList).subscribe(
      result => {
        this.lookupList = result;
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
  onClickSelectlookupdtl(i) {
    this.lookupdtlActiveIndex = i;
  }

  // Save Lookupdtl
  onClickSaveLookupdtlList() {
    this.sa1004Service.saveLookupdtlList(this.lookupdtlList).subscribe(
      result => {
        this.lookupdtlList = result;
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

  // Add New Lookupdtl
  onClickAddNewLookup() {
    this.lookupList.push(new SaLookup());
  }
  // Add New Lookup
  onClickAddNewLookupdtl() {
    if (!this.selectedLookupNo) {
      this.toastr.warning('First Save Lookup Information');
      return true;
    }
    let element = {
      lookupNo: this.selectedLookupNo
    };
    this.lookupdtlList.push(new SaLookupdtl(element));
  }
}
