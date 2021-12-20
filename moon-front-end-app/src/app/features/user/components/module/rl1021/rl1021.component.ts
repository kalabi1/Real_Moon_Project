import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../../../app.config';
import { RlCollection } from '../../../../../models/rl-collection.model';
import { RlTrn } from '../../../../../models/rl-trn.model';
import { RL1021Service } from './../../../../../services/rl1021/rl1021-service';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from '../../../../../core/popup/service/alert.service';

@Component({
  selector: 'app-rl1021',
  templateUrl: './rl1021.component.html'
})
export class RL1021Component implements OnInit {

  public trnList = new Array<RlCollection>();
  public rlCollectionList = new Array<RlCollection>();
  public customerList: any = [];
  public selectedCustomerNo = '';
  public selectedTrnNo;
  public listActiveIndex = 0;
  public editMode = false;
  public rlTrnInstallmentList = new Array<RlTrn>();
  public rlCollection = new RlCollection();
  public installmentAmount: number;
  public searchFields: any[] = ['collId'];
  public searchString;
  public filterFromDate: Date;
  public filterToDate: Date;
  public tempTrnFilterList = new Array<RlCollection>();
  public recordCount: number = 0;
  public filterCollNo: number;

  constructor(private http: HttpClient,
    private rl1021Service: RL1021Service,
    private alertService: AlertService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.filterFromDate = new Date();
    this.filterToDate = new Date();
    this.filterFromDate.setDate(this.filterFromDate.getDate() - 30);
    this.getTrnBalanceList();
    this.getCollectionList();
  }

  getTrnListFiltering() {

    setTimeout(() => {

      this.tempTrnFilterList = this.rlCollectionList;

      if (this.filterFromDate && this.filterToDate) {
        this.tempTrnFilterList = this.tempTrnFilterList.filter(x =>
          x.collDate >= this.filterFromDate &&
          x.collDate <= this.filterToDate);
      } else if (this.filterFromDate && !this.filterToDate) {
        this.tempTrnFilterList = this.tempTrnFilterList.filter(x =>
          x.collDate >= this.filterFromDate);
      }
      else if (!this.filterFromDate && this.filterToDate) {
        this.tempTrnFilterList = this.tempTrnFilterList.filter(x =>
          x.collDate <= this.filterToDate);
      }

      if (Number(this.filterCollNo) > 0) {
        this.tempTrnFilterList = this.tempTrnFilterList.filter(x => Number(x.collNo) === Number(this.filterCollNo));
      }

      this.tempTrnFilterList = this.tempTrnFilterList;

      this.recordCount = this.tempTrnFilterList.length;

    }, 500);

  }

  getInstallmentList(trnNo) {
    this.http.get(`${acConfig.apiUrl}/rl/trn/installment/trn-wise`, {
      params: {
        trnNo: trnNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.rlTrnInstallmentList = JSON.parse(JSON.stringify(response.body));
        if (this.rlCollection.installmentNo) {
          let trnInstallment = this.rlTrnInstallmentList.find(y => y.installmentNo == this.rlCollection.installmentNo)
          this.installmentAmount = trnInstallment.installmentAmount;
        }
      })
      .catch(console.log);
  }

  onclickSaveCollection() {
    this.rl1021Service.saveCollection(this.rlCollection).subscribe(
      result => {
        this.toastr.success('Saved Successfully');
        this.editMode = true;
        this.rlCollection = new RlCollection(result);
        this.rlCollectionList.splice(0, 0, this.rlCollection);
        this.tempTrnFilterList.splice(0, 0, this.rlCollection);
        this.onClickActiveIndex(0)
      },
      err => {
        // Do stuff whith your error
        if (err.text == 'insert successful') {
          this.toastr.success('Saved Successfully');
        }
        this.toastr.error('Unable to Save');
      },
      () => {
        // Do stuff after completion
      }
    );
  }

  onClickActiveIndex(i) {
    this.listActiveIndex = i;
    this.rlCollection = new RlCollection(this.rlCollectionList[i]);
    this.getInstallmentList(this.rlCollection.trnNo)
    let tempColl = new RlCollection(this.trnList.find(x => x.trnNo === this.rlCollection.trnNo));
    this.rlCollection.customerName = tempColl.customerName;
    this.rlCollection.dueAmount = Number(tempColl.dueAmount.toFixed(2));
    this.editMode = true;
  }

  onclickUpdateCollection() {
    this.rl1021Service.updateCollection(this.rlCollection).subscribe(
      result => {
        this.toastr.success('Saved Successfully');
        this.rlCollection = new RlCollection(result);
        this.editMode = true;
      },
      err => {
        // Do stuff whith your error
        if (err.text == 'insert successful') {
          this.toastr.success('Saved Successfully');
        }
        this.toastr.error('Unable to Save');
      },
      () => {
        // Do stuff after completion
      }
    );
  }

  onClickDeleteCollection() {
    this.alertService.danger("Do you want to delete ?", true).then(data => {
      if (data) {

        this.rl1021Service.deleteCollection(this.rlCollection.collNo).subscribe(
          result => {
            this.toastr.success('Deleted successfully ');
            this.rlCollectionList.splice(this.listActiveIndex, 1);
            this.tempTrnFilterList.splice(this.listActiveIndex, 1);
            this.onClickAddNew();
          },
          err => {
            this.toastr.error('Unable to Delete');
          },
          () => {
            // Do stuff after completion
          }
        );
      }
    })
  }

  onClickAddNew() {
    this.editMode = false;
    this.rlCollection = new RlCollection();
    this.installmentAmount = null;
    this.getTrnBalanceList();
    this.rlCollection.collDate = new Date();
  }

  getTrnBalanceList() {

    this.http.get(`${acConfig.apiUrl}/rl/trn/collection/get-trn-balance`, {
      params: {
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.trnList = JSON.parse(JSON.stringify(response.body));
      })
      .catch(console.log);
  }

  getCollectionList() {
    this.http.get(`${acConfig.apiUrl}/rl/trn/collection/`, {
      params: {
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.rlCollectionList = JSON.parse(JSON.stringify(response.body)).map(element => {
          return new RlCollection(element)
        });
        this.tempTrnFilterList = this.rlCollectionList;
        this.getTrnListFiltering();
        this.onClickActiveIndex(this.listActiveIndex);
      })
      .catch(console.log);
  }

  getTrnBalanceDetails() {
    let selectedTrnDate = this.rlCollection.collDate;
    this.rlCollection = new RlCollection(this.trnList.find(x => x.trnNo === this.rlCollection.trnNo));
    this.rlCollection.dueAmount = Number(this.rlCollection.dueAmount.toFixed(2));
    this.rlCollection.collDate = selectedTrnDate;
    this.getInstallmentList(this.rlCollection.trnNo);
  }

  getInstallmentDetails() {
    console.log(this.rlCollection.installmentNo)
    console.log(this.rlTrnInstallmentList)
    let trnInstallment = this.rlTrnInstallmentList.find(y => y.installmentNo == this.rlCollection.installmentNo)
    console.log(trnInstallment)
    this.installmentAmount = trnInstallment.installmentAmount
    this.rlCollection.paidAmount = Number(this.installmentAmount)
  }
}
