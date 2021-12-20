import { HttpClient } from '@angular/common/http';
import { Customer } from './../../../models/customer.model';
import { CustomerService } from './../../../services/customerService/customer.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WebStorageService } from '../../../core/services/web-storage.service';
import { acConfig } from '../../../app.config'
import { AlertService } from '../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public customer = new Customer();
  workspace: string;
  username: string;
  password: string;

  constructor(private dataService: DataService,
    private router: Router,
    private http: HttpClient,
    private token: WebStorageService,
    private toastr: ToastrService) { }

  ngOnInit() {
    if (this.token.getCookie()) {
      this.router.navigate(['/']);
    }
  }

  atemptLogin() {
    this.dataService.userLogin(this.username, this.password).subscribe(data => {
      if (data.status === 200) {
        this.token.setCookie()
        this.token.saveToken(data.header.TOKEN);
        this.token.saveUser(data.body);
        this.router.navigate(['/']);
        console.log("inner working", data);
      } else {
        this.toastr.error('Not Valid Customer');
      }
    }, err => {
    })
  }
  getYYYYMMDDDashFromDate(date) {
    if (!date) return null;
    try {
      const dateObj = new Date(date);
      const dd = dateObj.getDate();
      const mm = dateObj.getMonth() + 1;
      const yyyy = dateObj.getFullYear().toString();
      let rDd = dd.toString();
      let rMm = mm.toString();
      if (dd < 10) {
        rDd = '0' + dd.toString();
      }
      if (mm < 10) {
        rMm = '0' + mm.toString();
      }
      return yyyy + '-' + rMm + '-' + rDd;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  onClickSave() {
    if (this.customer.password != this.customer.confirmPassword) {
      this.toastr.error('Password Not Matched!');
      return;
    }

    let body = new FormData();
    // Add file content to prepare the request
    body.append("customerNo", JSON.parse(JSON.stringify(this.customer.customerNo)));
    body.append("customerId", this.customer.customerId);
    body.append("customerName", this.customer.customerName);
    body.append("fatherName", this.customer.fatherName);
    body.append("motherName", this.customer.motherName);
    body.append("spouseName", this.customer.spouseName);
    body.append("presentAddress", this.customer.presentAddress);
    body.append("dob", this.customer.dob ? this.getYYYYMMDDDashFromDate(this.customer.dob) : '');
    body.append("religion", this.customer.religion);
    body.append("nid", this.customer.nid);
    body.append("nationality", this.customer.nationality);
    body.append("telephone", this.customer.telephone);
    body.append("mobile", this.customer.mobile);
    body.append("email", this.customer.email);
    body.append("contactPerson", this.customer.contactPerson);
    body.append("cpMobile", this.customer.cpMobile);
    body.append("designation", this.customer.designation);
    body.append("officeAddress", this.customer.officeAddress);
    body.append("customerPictureName", this.customer.customerPictureName);
    body.append("password", this.customer.password);

    console.log('body add', body)

    // Launch post request
    this.http.post(`${acConfig.apiUrl}/rl/customer/add`, body)
      .subscribe(
        (data) => {
          console.log(data)
          this.customer = new Customer(data);
          this.toastr.success('Registration successfully');
        },
        // Or errors :-(
        error => {
          console.log(error),
            this.toastr.error('Failed to Registration');
          // tell us if it's finished
          () => { console.log("completed") }
        }


      );
  }



}
