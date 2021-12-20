import { HttpClient } from '@angular/common/http';
import { Customer } from './../../../models/customer.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WebStorageService } from '../../../core/services/web-storage.service';
import { acConfig } from '../../../app.config'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public customer = new Customer();
  workspace: number;
  username: string;
  password: string;
  public compnayList = [];

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

  getCompanyList() {
    this.dataService.userCompany(this.username).subscribe(data => {
      this.compnayList = JSON.parse(JSON.stringify(data.body));
      this.workspace = this.compnayList[0].COMPANY_NO;
    })
  }

  getCompanyInfo(companyNo) {
    this.http.get(`${acConfig.apiUrl}/sa/company/get-company`, {
      params: {
        companyNo: companyNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        console.log("response ", response.body);
        let obj = JSON.parse(JSON.stringify(response.body));
        this.token.saveCompanyInfo(response.body);
        this.router.navigate(['/']);
      })
      .catch(console.log);

  }


  atemptLogin() {
    this.dataService.userLogin(this.username, this.password, this.workspace).subscribe(data => {
      if (data.status === 200) {
        this.token.setCookie()
        this.token.saveToken(data.header.TOKEN);
        this.token.saveUser(data.body);
        this.getCompanyInfo(this.workspace);
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
}
