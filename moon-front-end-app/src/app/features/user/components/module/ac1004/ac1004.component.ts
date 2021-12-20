import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
import { acConfig } from '../../../../../app.config';
import { Ac1004Service } from '../../../../../services/ac1004/ac1004-service';
import { AcNature } from '../../../../../models/ac-nature.model';

@Component({
  selector: 'app-ac1004',
  templateUrl: './ac1004.component.html'
})
export class AC1004Component implements OnInit {

  public acNatureList = new Array<AcNature>();

  constructor(private http: HttpClient,
    private alertService: AlertService,
    private toastr: ToastrService,
    private ac1004Service: Ac1004Service) { }

  ngOnInit() {

    this.getAcNatureList();
  }

  // Get Voucher Type List
  getAcNatureList() {
    this.http.get(`${acConfig.apiUrl}/ac/nature/`, {
      params: {
        // projectNo: '84'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.acNatureList.length = 0;
        this.acNatureList = JSON.parse(JSON.stringify(response.body));
      })
      .catch(console.log);
  }

  // Add New Voucher Type List
  onClickAddNewNature() {
    this.acNatureList.push(new AcNature());
  }

  onClickDeleteNature(vtypeNo, index) {
    console.log(index);
    if (vtypeNo) {
      this.alertService.danger("Do you want to delete ?", true).then(data => {
        if (data) {
          this.ac1004Service.deleteAcNature(vtypeNo).subscribe(result => {
            this.acNatureList.splice(index, 1);
            this.toastr.success('Deleted Successfully');
          }, err => {
            this.toastr.error('Unable to Delete');
            console.log(err);
          });
        }
      })
    } else {
      this.acNatureList.splice(index, 1);
    }
  }


  // Save Nature List
  onClickSaveNatureList() {
    this.ac1004Service.saveAcNatureList(this.acNatureList).subscribe(
      result => {
        this.acNatureList = result;
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
