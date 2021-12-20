import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../../../app.config';
import { Rl1018Service } from '../../../../../services/rl1018/rl1018-service';

@Component({
  selector: 'app-rl1018',
  templateUrl: './rl1018.component.html'
})
export class RL1018Component implements OnInit {

  public propertyContactList: any = [];
  public filterPropertyContactList: any = [];
  public unreadCount = 0;
  public readCount = 0;
  public allMessageCount = 0;
  public curPage = 1;
  public showRecordsNo = 10;

  constructor(private http: HttpClient,
    private rl1018Service: Rl1018Service) { }

  ngOnInit() {
    this.getContactList();
  }

  getContactList() {
    this.http.get(`${acConfig.apiUrl}/rl/property-contact/`, {
      params: {},
      observe: 'response'
    }).toPromise().then(response => {
      this.propertyContactList = JSON.parse(JSON.stringify(response.body));
      this.filterPropertyContactList = this.propertyContactList;
      this.unreadCount = 0;
      this.readCount = 0;
      this.allMessageCount = 0;
      this.propertyContactList.forEach(element => {
        if (element.readFlag == 0) {
          this.unreadCount += 1;
        } else if (element.readFlag == 1) {
          this.readCount += 1;
        }
        this.allMessageCount += 1;
      });
      this.getFilterList(0)
    })
      .catch(console.log)
  }

  getFilterList(type) {
    this.filterPropertyContactList = this.propertyContactList;
    if (type === 1 || type === 0) {
      this.filterPropertyContactList = this.filterPropertyContactList.filter(
        x => x.readFlag === type)
    }
  }

  onClickRead(i) {
    this.rl1018Service.updateReadStatus(this.filterPropertyContactList[i]).subscribe(
      result => {
        this.getContactList();
      },
      err => {
        // Do stuff whith your error
        if (err.text == 'insert successful') {
        }
      },
      () => {
        // Do stuff after completion
      }
    );
  }
  onClickUnRead(i) {
    this.rl1018Service.updateUnReadStatus(this.filterPropertyContactList[i]).subscribe(
      result => {
        this.getContactList();
      },
      err => {
        // Do stuff whith your error
        if (err.text == 'insert successful') {
        }
      },
      () => {
        // Do stuff after completion
      }
    );
  }

}
