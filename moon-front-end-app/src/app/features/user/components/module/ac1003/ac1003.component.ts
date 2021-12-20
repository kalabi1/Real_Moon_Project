import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
import { acConfig } from '../../../../../app.config';
import { AcPeriod } from '../../../../../models/ac-period.model';
import { Ac1003Service } from '../../../../../services/ac1003/ac1003-service';
@Component({
  selector: 'app-ac1003',
  templateUrl: './ac1003.component.html'
})
export class AC1003Component implements OnInit {

  public acPeriodList = new Array<AcPeriod>();

  constructor(private http: HttpClient,
    private alertService: AlertService,
    private toastr: ToastrService,
    private ac1003Service: Ac1003Service) { }

  ngOnInit() {
    this.getAcPeriodList();
  }

  // Get AC Period
  getAcPeriodList() {
    this.http.get(`${acConfig.apiUrl}/ac/period/`, {
      params: {
        // projectNo: '84'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.acPeriodList.length = 0;
        // this.acPeriodList = JSON.parse(JSON.stringify(response.body));
        this.acPeriodList = JSON.parse(JSON.stringify(response.body)).map(element => {
          return new AcPeriod(element)
        });
        console.log(this.acPeriodList)
      })
      .catch(console.log);
  }

  // Add New Voucher Type List
  onClickAddNewAcPeriod() {
    this.acPeriodList.push(new AcPeriod());
  }

  onClickDeleteAcPeriod(periodNo, index) {
    console.log(index);
    if (periodNo) {
      this.alertService.danger("Do you want to delete ?", true).then(data => {
        if (data) {
          this.ac1003Service.deleteAcPeriod(periodNo).subscribe(result => {
            this.acPeriodList.splice(index, 1);
            this.toastr.success('Deleted Successfully');
          }, err => {
            this.toastr.error('Unable to Delete');
            console.log(err);
          });
        }
      })
    } else {
      this.acPeriodList.splice(index, 1);
    }
  }


  // Save AcPeriod List
  onClickSaveAcPeriodList() {
    this.ac1003Service.saveAcPeriod(this.acPeriodList).subscribe(
      result => {
        this.acPeriodList = result;
        this.toastr.success('Saved successfully');
      },
      err => {
        // Do stuff whith your error
        this.toastr.error('Unable to save');
      },
      () => {
        // Do stuff after completion
      }
    );
  }
}
