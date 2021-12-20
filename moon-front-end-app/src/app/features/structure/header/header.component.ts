import { Component, OnInit } from '@angular/core';
import { WebStorageService } from '../../../core/services/web-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public customerName;
  public isLoged = false;
  public profilMenuExpan = false;

  constructor(
    private token: WebStorageService,
    private router: Router,
  ) { }

  ngOnInit() {

    if (localStorage.getItem("user")) {
      this.customerName = JSON.parse(localStorage.getItem("user")).emp_NAME;
      this.isLoged = true;
    } else {
      this.isLoged = false;
    }
  }
  onClickOpenProfileMenu() {
    this.profilMenuExpan = !this.profilMenuExpan;
  }

  onClickLogOut(e) {
    console.log(e);

    e.preventDefault();
    this.token.removeCookie();
    this.token.removeUserData();
    this.router.navigate(['login']);
    localStorage.clear();
  }

}
