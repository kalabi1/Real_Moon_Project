import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService } from '../../../core/services/web-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private token: WebStorageService, private router: Router) { }

  ngOnInit() {
    console.log("working on logout component");
    this.token.removeCookie();
    this.token.removeUserData();
    this.router.navigate(['login']);

  }
}
