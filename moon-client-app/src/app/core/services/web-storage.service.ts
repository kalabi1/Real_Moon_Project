import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { takeWhile, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { globalVariables } from '../constants/globalVariables';

@Injectable({
  providedIn: 'root'
})
export class WebStorageService {
  private cookieKey = "PRIDE_BOARD_AUTH_TOKEN_KEY";
  private cookieValue = "PRIDE_BOARD_AUTH_TOKEN_VALUE";
  private tokenKey = 'PRIDE_BOARD_AuthToken';
  stopCondition: boolean = false;

  constructor(private router: Router) { }

  signOut() {
    this.removeCookie();
    window.localStorage.removeItem(this.tokenKey);
    window.sessionStorage.removeItem(this.tokenKey);
    window.localStorage.removeItem('user');
  }

  setCookie() {
    document.cookie = this.cookieKey + "=" + this.cookieValue + ";path=/";
  }
  removeCookie() {
    document.cookie = this.cookieKey + "=; expires=Thu, 01 JAN 1970 12:00:00 UTC; path=/";
  }

  getCookie() {
    if (this.getToken() == "") {
      return "";
    }
    var name = this.cookieKey + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(this.tokenKey);
    window.localStorage.setItem(this.tokenKey, token);
    window.sessionStorage.removeItem(this.tokenKey);
    window.sessionStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string {
    if (window.sessionStorage.getItem(this.tokenKey)) {
      if (window.localStorage.getItem(this.tokenKey) === window.sessionStorage.getItem(this.tokenKey)) {
        return window.sessionStorage.getItem(this.tokenKey);
      }
      else return "";
    }
    else {
      window.sessionStorage.setItem(this.tokenKey, window.localStorage.getItem(this.tokenKey));
      return window.sessionStorage.getItem(this.tokenKey);
    }
  }

  public saveUser(user) {
    globalVariables.userInfo = user;
    window.localStorage.removeItem('user');
    window.localStorage.setItem('user', JSON.stringify(user));
    WebStorageService.setUserGloablData();
  }

  public getUser() {
    return JSON.parse(window.localStorage.getItem('user'));
  }

  public static setUserGloablData() {
    globalVariables.userInfo = JSON.parse(window.localStorage.getItem('user'));
    globalVariables.companyList = JSON.parse(window.localStorage.getItem('companyList'));
  }

  public runMyHero() {
    let source = interval(5000)
      .pipe(takeWhile(() => !this.stopCondition))
      .subscribe(i => {
        // This will be called every 10 seconds until `stopCondition` flag is set to true
        if (!this.getCookie()) {
          this.signOut()
          this.stopCondition = true;
          this.router.navigate(['/login']);
        }
      })
  }

  public removeUserData() {
    window.localStorage.clear();
  }

}
