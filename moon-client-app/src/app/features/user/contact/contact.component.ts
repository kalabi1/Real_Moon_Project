import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RlContact } from './../../../models/rl-property-contact.model';
import { AlertService } from '../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
import { acConfig } from '../../../app.config';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  public rlContact = new RlContact();
  public isHTML;
  public mailSubject;
  public messageBody;
  public sendBcc: Array<string> = [];
  public sendCC: Array<string> = [];
  public sendTo: Array<string> = [];

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  onclickSendContactMail() {

    // Capture Contact Email
    this.http.get(`${acConfig.apiUrl}/rl/configuration/get-config`, {
      params: {

      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {

        this.sendTo = JSON.parse(JSON.stringify(response.body)).contactMailSendTo.split(',');
        this.sendCC = JSON.parse(JSON.stringify(response.body)).contactMailSendCc.split(',');
        this.sendBcc = JSON.parse(JSON.stringify(response.body)).contactMailSendBcc.split(',');

        // Send Mail    
        this.isHTML = true;
        this.mailSubject = 'New contact from ' + this.rlContact.cpName;
        this.messageBody = '<b>Name: </b>' + this.rlContact.cpName + '<br />' +
          '<b>Email: </b>' + this.rlContact.cpEmail + '<br />' +
          '<b>Mobile: </b>' + this.rlContact.cpMobile + '<br />' +
          '<b>Comments: </b>' + this.rlContact.cpComments;

        let body = new FormData();
        // Add file content to prepare the request
        body.append('sendTo', JSON.parse(JSON.stringify(this.sendTo)));
        if (this.sendCC.length > 0) {
          body.append('sendCC', JSON.parse(JSON.stringify(this.sendCC)));
        }
        if (this.sendBcc.length > 0) {
          body.append('sendBcc', JSON.parse(JSON.stringify(this.sendBcc)));
        }

        body.append('mailSubject', this.mailSubject);
        body.append('messageBody', this.messageBody);
        body.append('isHTML', this.isHTML);

        this.http.post(`${acConfig.apiUrl}/email/send-mail`, body)
          .subscribe((data) => {
            this.toastr.success('Contacted Successfully');
            this.rlContact = new RlContact();
          },
            error => {
              console.log(error);
              this.toastr.error('Contacted Failed');
            },
            () => {
              console.log('Completed')
            }
          );
      })
      .catch(console.log);
  }
}
