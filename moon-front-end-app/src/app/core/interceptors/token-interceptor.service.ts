import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { Router } from '@angular/router';

import { SpinnerService } from '../services/spinner.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private timer = 0;

    constructor(
        private router: Router,
        public spinnerService: SpinnerService,
        private toastr: ToastrService
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        if (request.url.includes('/core/auth/companies') || request.url.includes('/core/auth/login')) {
        } else {
            request = request.clone({
                headers: request.headers.set('TOKEN', localStorage.NAHAL_IT_AuthToken)
            })
        }
        return this.sendRequest(request, next);
    }


    sendRequest(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        let authRequest = req;

        const started = Date.now();
        clearTimeout(this.timer);
        if (this.spinnerService.isBlock() === false) {
            this.timer = setTimeout(() => {
                this.spinnerService.blockOn();
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
                    }
                }),
                catchError(err => {
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.spinnerService.blockOff();
                    });

                    return throwError(err);
                })
            );
    }
}