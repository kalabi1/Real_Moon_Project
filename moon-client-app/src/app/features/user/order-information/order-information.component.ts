import { RlTrn } from './../../../models/rl-trn.model';
import { Item } from './../../../models/project.model';
import { Customer } from './../../../models/customer.model';
import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../app.config'
import { ActivatedRoute, Router } from '@angular/router';
import { Nominee } from '../../../models/nominee.model';
import { fixedValues } from '../../../fixedValues'

@Component({
  selector: 'app-order-information',
  templateUrl: './order-information.component.html'
})
export class OrderInformationComponent implements OnInit {
  public countryList = fixedValues.countryList;
  public customer: Customer;
  public itemObj: Item;
  public transaction = new RlTrn();
  public nominee = new Nominee();
  public trnInstallmentList = new Array<RlTrn>();
  public installmentPayCount: number = 0;
  public installmentPayAmount: number = 0;
  public sliderbaseUrl;
  public customerPhotoUrl;
  public nomineePhotoUrl;
  public nomineeList;

  constructor(private http: HttpClient,
    private route: ActivatedRoute) {
    this.customer = new Customer();
    this.itemObj = new Item();
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.sliderbaseUrl = acConfig.fileUrl;
    if (id != null) {
      this.getOrderDetails(id);
    }
  }

  getOrderDetails(id) {
    this.http.get(`${acConfig.apiUrl}/rl/trn/get-trn`, {
      params: {
        trnNo: id
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.transaction = new RlTrn(response.body);
        if (this.transaction.itemNo != null) {
          this.getItemDetails(this.transaction.itemNo);
        }
        if (this.transaction.customerNo != null) {
          this.getCustomer(this.transaction.customerNo);
        }
        this.getNomineeDetails(this.transaction.trnNo);
        this.getTrnInstallmentList();
      })
      .catch(console.log);
  }

  getNomineeDetails(id) {
    this.http.get(`${acConfig.apiUrl}/rl/trn/nominee/get-nominee`, {
      params: {
        trnNo: id
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.nominee = new Nominee(response.body)
        this.nomineePhotoUrl = acConfig.fileUrl + this.nominee.nomineePictureName;

      })
      .catch(console.log);
  }

  getItemDetails(id) {
    this.http.get(`${acConfig.apiUrl}/rl/cu/item/details`, {
      params: {
        itemNo: id
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.itemObj = new Item(response.body);
        this.itemObj['projectLayoutPhoto'] = this.sliderbaseUrl + this.itemObj.itemBrandPhoto;
      })
      .catch(console.log);
  }

  getCustomer(customerNo) {
    this.http.get(`${acConfig.apiUrl}/rl/customer/get-customer`, {
      params: {
        customerNo: customerNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        console.log("response", response);
        this.customer = new Customer(response.body);
        let arr = fixedValues.countryList.filter(element => element.VALUE == this.customer.nationality);
        if (arr.length > 0) {
          this.customer.nationalityDisplay = arr[0].TEXT;
        }
        this.customerPhotoUrl = acConfig.fileUrl + this.customer.customerPictureName;
      })
      .catch(console.log);
  }

  getTrnInstallmentList() {
    this.http.get(`${acConfig.apiUrl}/rl/trn/installment/trn-wise-list`, {
      params: {
        trnNo: '' + this.transaction.trnNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.trnInstallmentList = JSON.parse(JSON.stringify(response.body)).map(element => {
          if (element['payFlag'] === 1) {
            element['installmentPayStatus'] = 'Paid';
          } else if (element['payFlag'] === 2) {
            element['installmentPayStatus'] = 'Partial';
          }
          else {
            element['installmentPayStatus'] = 'Pending';
          }
          return new RlTrn(element);
        })
        let installmentList = this.trnInstallmentList.filter(i => i.payFlag > 0)
        this.installmentPayCount = installmentList.length;
        for (let installment of installmentList) {
          if (Number(JSON.parse(JSON.stringify(installment)).installmentAmount) > 0) {
            this.installmentPayAmount += Number(JSON.parse(JSON.stringify(installment)).installmentAmount)
          }
        }
      })
      .catch(console.log);
  }
}
