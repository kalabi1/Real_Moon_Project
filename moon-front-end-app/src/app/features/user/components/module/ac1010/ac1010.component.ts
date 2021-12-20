import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../../../app.config';
import { AcVoucher } from '../../../../../models/ac-voucher.model';
import { AcVoucherdtl } from '../../../../../models/ac-voucherdtl.model';
import { AlertService } from '../../../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-ac1010',
  templateUrl: './ac1010.component.html'
})
export class AC1010Component implements OnInit {
  public acVoucherList = new Array<AcVoucher>();
  public acVoucherdtlList = new Array<AcVoucherdtl>();
  public acVoucher = new AcVoucher();
  public isDisabled = true;
  public acVoucherActiveIndex = 0;
  public acVoucherdtlActiveIndex = 0;
  public searchString:string;
  public searchFields: any[] = ['vid'];


  constructor(private http: HttpClient,
    private alertService: AlertService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getVoucherList()
  }

  getVoucherList() {
    this.http.get(`${acConfig.apiUrl}/ac/voucher/ref-list`, {
      params: {
        // projectNo: '84'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.acVoucherList.length = 0;
        this.acVoucherList = JSON.parse(JSON.stringify(response.body)).map(x => {
          x = new AcVoucher(x);
          return x;
        });

        this.acVoucher = this.acVoucherList[0];
        this.onClickGetVoucherDtl(this.acVoucher.vno)

      })
      .catch(console.log);
  }

  onClickGetVoucherDtl(vno) {
    this.http.get(`${acConfig.apiUrl}/ac/voucher/voucherdtl/list-ref`, {
      params: {
        vNo: vno
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.acVoucherdtlList = JSON.parse(JSON.stringify(response.body)).map(element => {
          element['type'] = Number(element['dr']) > 0 && Number(element['cr']) < 0 ? 'Dr' : 'Cr';
          return element;
        });

      })
      .catch(console.log);
  }

  onClickUpdateVoucherCheckStatus(i, vNo, checkFlag) {
    if (!checkFlag) {
      checkFlag = 1;
    } else {
      checkFlag = 0;
    }

    this.alertService.warning("Do you want to Update ?", true, 'Confirmation').then(data => {
      if (data) {
        this.http.put(`${acConfig.apiUrl}/ac/voucher/update/check-status?vNo=${vNo}&checkFlag=${checkFlag}`, {})
          .subscribe(
            result => {
              if (checkFlag === 0) {
                this.acVoucherList[i].checkedBy = null;
                this.acVoucherList[i].checkDate = null;
              } else {
                JSON.parse(localStorage.getItem("user")).emp_NAME
                this.acVoucherList[i].checkedBy = JSON.parse(localStorage.getItem("user")).emp_NAME + ' : ' + JSON.parse(localStorage.getItem("user")).emp_ID;
                this.acVoucherList[i].checkDate = new Date();
              }
              this.toastr.success('Update Successfully');
            },
            err => {
              this.toastr.error('Unable to Update');
            },
            () => {
              // Do stuff after completion
            }
          )
      } else {
        this.acVoucherList[i].checkFlag = checkFlag === 1 ? 0 : 1;
      }
    })
  }

  onClickUpdateVoucherPostStatus(i, vNo, postFlag) {
    if (!postFlag) {
      postFlag = 1;
    } else {
      postFlag = 0;
    }

    this.alertService.warning("Do you want to Update ?", true, 'Confirmation').then(data => {
      if (data) {
        this.http.put(`${acConfig.apiUrl}/ac/voucher/update/post-status?vNo=${vNo}&postFlag=${postFlag}`, {})
          .subscribe(
            result => {
              if (postFlag === 0) {
                this.acVoucherList[i].postedBy = null;
                this.acVoucherList[i].postDate = null;
              } else {
                this.acVoucherList[i].postedBy = JSON.parse(localStorage.getItem("user")).emp_NAME + ' : ' + JSON.parse(localStorage.getItem("user")).emp_ID;
                this.acVoucherList[i].postDate = new Date();
              }
              this.toastr.success('Update Successfully');
            },
            err => {
              this.toastr.error('Unable to Update');
            },
            () => {
              // Do stuff after completion
            }
          )
      } else {
        this.acVoucherList[i].postFlag = postFlag === 1 ? 0 : 1;
      }
    })
  }
}
