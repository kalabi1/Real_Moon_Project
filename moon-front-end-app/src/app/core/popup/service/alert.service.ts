import { Injectable } from '@angular/core';
import { Alert } from '../interfaces/alert'
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertSettings$ = new Subject<Alert>();
  confirmObservable$ = new Subject<String>();
  subs: Subscription;
  constructor() { }

  create(title: string, type: string, body: string, confirmation?: boolean) {
    return new Promise((resolve) => {
      this.alertSettings$.next({
        title,
        type,
        body,
        confirmation
      });
      this.subs = this.confirmObservable$.subscribe(data => {
        resolve(data);
        this.subs.unsubscribe();
      });
    });
  }

  success(body?: string, confirmation?: boolean, title?: string) {
    return new Promise((resolve) => {
      this.alertSettings$.next({
        body: body ? body : 'Success message',
        confirmation,
        title: title ? title : 'Success',
        type: "success",
      });
      this.subs = this.confirmObservable$.subscribe(data => {
        resolve(data);
        this.subs.unsubscribe();
      });
    });
  }
  warning(body?: string, confirmation?: boolean, title?: string) {
    return new Promise((resolve) => {
      this.alertSettings$.next({
        body: body ? body : 'Warning message',
        confirmation,
        title: title ? title : 'Warning',
        type: "warning",
      });
      this.subs = this.confirmObservable$.subscribe(data => {
        resolve(data);
        this.subs.unsubscribe();
      });
    });
  }
  danger(body?: string, confirmation?: boolean, title?: string) {
    return new Promise((resolve) => {
      this.alertSettings$.next({
        body: body ? body : 'Danger message',
        confirmation,
        title: title ? title : 'Danger',
        type: "danger",
      });
      this.subs = this.confirmObservable$.subscribe(data => {
        resolve(data);
        this.subs.unsubscribe();
      });
    });
  }
  info(body?: string, confirmation?: boolean, title?: string) {
    return new Promise((resolve) => {
      this.alertSettings$.next({
        body: body ? body : 'Info',
        confirmation,
        title: title ? title : 'Confirmation',
        type: "info",
      });
      this.subs = this.confirmObservable$.subscribe(data => {
        resolve(data);
        this.subs.unsubscribe();
      });
    });
  }


}
