import { CartService } from './../../../services/add-to-cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService } from '../../../core/services/web-storage.service';
import { acConfig } from '../../../app.config'
import { HttpClient } from '@angular/common/http';
import { SaCompany } from './../../../models/sa-company.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalCartItem = 0;
  public customerId;
  public customerPictureName;
  public isLoged = false;
  public companyLogoUrl;
  public companyFaviconUrl;
  public company = new SaCompany();

  constructor(
    private cartService: CartService,
    private token: WebStorageService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getCompanyInformation();
    let tempList = this.cartService.getCarts();
    this.totalCartItem = Object.values(tempList).length;

    if (localStorage.getItem("user")) {
      this.customerId = JSON.parse(localStorage.getItem("user")).customerId;
      this.customerPictureName =
        JSON.parse(localStorage.getItem("user")).customerPictureName !== null ? acConfig.fileUrl + JSON.parse(localStorage.getItem("user")).customerPictureName : 'assets/images/avater.png';
      this.isLoged = true;
    } else {
      this.isLoged = false;
    }
  }

  getCompanyInformation() {
    this.http.get(`${acConfig.apiUrl}/sa/company/get-company`, {
      params: {
        companyNo: '1'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        console.log("response", response);
        this.company = new SaCompany(response.body);
        this.companyLogoUrl = acConfig.fileUrl + JSON.parse(JSON.stringify(response.body)).companyLogoName;
        this.companyFaviconUrl = acConfig.fileUrl + JSON.parse(JSON.stringify(response.body)).companyLogoName;
      })
      .catch(console.log);
  }

  onClickLogOut() {
    this.token.removeCookie();
    this.token.removeUserData();
    this.router.navigate(['login']);

  }
  public profilMenuExpan = false;
  public loginFormExpand = false;
  onClickOpenProfileMenu() {
    this.profilMenuExpan = !this.profilMenuExpan;
  }

  onClickLogin() {
    this.loginFormExpand = !this.loginFormExpand;
  }
  onClickReload(num) {
  }
}
