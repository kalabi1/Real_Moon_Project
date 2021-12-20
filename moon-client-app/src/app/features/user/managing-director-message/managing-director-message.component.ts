import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { acConfig } from '../../../app.config'
import { SaMessage } from '../../../models/sa-message.model';

@Component({
  selector: 'app-managing-director-message',
  templateUrl: './managing-director-message.component.html'
})
export class ManagingDirectorMessageComponent implements OnInit {
  public saMessage = new SaMessage();
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getMessage('MD');
  }

  getMessage(type) {
    this.http.get(`${acConfig.apiUrl}/sa/message/get-message-by-messenger`, {
      params: {
        messengerType: type
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.saMessage = new SaMessage(response.body);
        this.saMessage.message = this.getEditorValue(this.saMessage.message)
        if (this.saMessage.messengerPhotoName) {
          this.saMessage.messengerPhotoName = acConfig.fileUrl + this.saMessage.messengerPhotoName;
        }
        console.log(this.saMessage)
      })
      .catch(console.log);
  }

  getEditorValue(value) {
    value = value.replace(/\r|\n/g, "<br />").replace(/\*(.+?)\*/g, "<b>$1</b>")
    return value;
  }
}
