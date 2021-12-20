import { Component, OnInit } from '@angular/core';
import { fixedValues } from '../../../fixedValues'
import { Customer } from './../../../models/customer.model';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../app.config'
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html'
})
export class MyProfileComponent implements OnInit {
  public countryList = fixedValues.countryList;
  public customer = new Customer();
  public customerNo;
  public customerPhoto;
  public customerPhotoUrl;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.customerNo = JSON.parse(localStorage.getItem("user")).customerNo;
    if (this.customerNo) {
      this.getCustomer(this.customerNo);
    }
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
        if (this.customer.customerPictureName != null) {
          this.customerPhotoUrl = acConfig.fileUrl + this.customer.customerPictureName;
        }
      })
      .catch(console.log);
  }
}
