import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { WebStorageService } from '../services/web-storage.service';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private timer = 0;

  constructor(
    private storage: WebStorageService,
    private router: Router,
    public spinnerService: SpinnerService,
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.sendRequest(request, next);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authRequest = req;

    const started = Date.now();
    clearTimeout(this.timer);
    if (this.spinnerService.isBlock() === false) {
      this.timer = setTimeout(() => {
        this.spinnerService.blockOn();
      });
    }

    if (this.storage.getToken()) {
      authRequest = req.clone({
        setHeaders: {
          "TOKEN": this.storage.getToken()
        }
      });

    }

    return next.handle(authRequest)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
              this.spinnerService.blockOff();
            });
            const elapsed = Date.now() - started;
          }
        }),
        catchError(err => {
          let errorMessage = '';
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.spinnerService.blockOff();
          });

          if (err instanceof HttpErrorResponse && err.status === 0) {
            console.log(err);
          } else if (err instanceof HttpErrorResponse && err.status === 401) {
            this.storage.signOut();
            this.router.navigate(['/', 'login']);
          } else {
            console.log(err);
          }
          return throwError(err);
        })
      );
  }
}