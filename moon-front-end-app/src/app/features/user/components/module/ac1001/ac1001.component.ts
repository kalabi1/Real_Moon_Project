import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { acConfig } from '../../../../../app.config';
import { AcVouchertype } from '../../../../../models/ac-vouchertype.model';
import { Ac1001Service } from '../../../../../services/ac1001/ac1001-service';
import { globalVariables } from '../../../../../core/constants/globalVariables';

@Component({
  selector: 'app-ac1001',
  templateUrl: './ac1001.component.html'
})
export class AC1001Component implements OnInit {

  public voucherTypeList = new Array<AcVouchertype>();

  constructor(private http: HttpClient,
    private alertService: AlertService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private ac1001Service: Ac1001Service) { }

  ngOnInit() {

    this.getVoucherTypeList();
    console.log("companyInfo ", globalVariables.companyInfo);
  }

  // Get Voucher Type List
  getVoucherTypeList() {
    this.http.get(`${acConfig.apiUrl}/ac/configuration/vtype/`, {
      params: {
        // projectNo: '84'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.voucherTypeList.length = 0;
        this.voucherTypeList = JSON.parse(JSON.stringify(response.body));
      })
      .catch(console.log);
  }

  // Add New Voucher Type List
  onClickAddNewVtype() {
    this.voucherTypeList.push(new AcVouchertype());
  }

  onClickDeleteVtype(vtypeNo, index) {
    console.log(index);
    if (vtypeNo) {
      this.alertService.danger("Do you want to delete ?", true).then(data => {
        if (data) {
          this.ac1001Service.deleteAcVtype(vtypeNo).subscribe(result => {
            this.voucherTypeList.splice(index, 1);
            this.toastr.success('Deleted Successfully');
          }, err => {
            this.toastr.error('Unable to Delete');
            console.log(err);
          });
        }
      })
    } else {
      this.voucherTypeList.splice(index, 1);
    }
  }


  // Save Vtype List
  onClickSaveVtypeList() {
    this.ac1001Service.saveAcVtypeList(this.voucherTypeList).subscribe(
      result => {
        this.voucherTypeList = result;
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
