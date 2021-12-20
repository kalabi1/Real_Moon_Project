import { Component, OnInit } from '@angular/core';
import { acConfig } from '../../../app.config'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html'
})
export class MyOrderComponent implements OnInit {
  public customerTrnList;
  public customerNo;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.customerNo = JSON.parse(localStorage.getItem("user")).customerNo;
    if (this.customerNo != null) {
      this.getCustomerOrderList(this.customerNo);
    }
  }


  getCustomerOrderList(customerNo) {
    this.http.get(`${acConfig.apiUrl}/rl/trn/get-customer-trn`, {
      params: {
        customerNo: customerNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        console.log("response", response);
        this.customerTrnList = response.body;
      })
      .catch(console.log);
  }
}
