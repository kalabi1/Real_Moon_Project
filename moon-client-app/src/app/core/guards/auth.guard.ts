import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { WebStorageService } from '../services/web-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storage: WebStorageService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {

    if (this.storage.getCookie()) {
      if (url === '/user' && this.storage.getUser().owner === false) {
        this.router.navigate(['/not-found']);
        return false;
      }
      else if (url.indexOf('build') > 0 && (this.storage.getUser().owner === false && this.storage.getUser().admin === false)) {
        this.router.navigate(['/not-found']);
        return false;
      }
      else {
        this.storage.runMyHero();
        return true;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
