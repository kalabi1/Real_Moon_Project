import { Component, OnInit } from '@angular/core';
import { AlertService } from './service/alert.service';
@Component({
  selector: 'nl-popup',
  templateUrl: './alert.component.html',
})
export class AlertComponent implements OnInit {

  modalStatus: boolean;
  title: string;
  type: string;
  body: string;
  confirmation = false;
  public className: string;
  color: string;
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.alertSettings$.subscribe((data) => {
      this.title = data.title,
        this.type = data.type,
        this.body = data.body;
      this.confirmation = data.confirmation;
      if (this.type == 'danger') {
        this.className = 'popup-confirm--delete'
      }
      if (this.type == 'success') {
        this.className = 'popup-confirm--success'
      }
      if (this.type == 'warning') {
        this.className = 'popup-confirm--warning'
      }
      if (this.type == 'info') {
        this.className = 'popup-confirm--info'
      }
      if (this.type == 'alert') {
        this.className = 'modal-alert'
      }
      this.modalStatus = true;
    });

  }

  resolve(confirmation) {
    this.modalStatus = false;
    this.alertService.confirmObservable$.next(confirmation);
  }

}
