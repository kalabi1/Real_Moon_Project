import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { WebStorageService } from './web-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderProviderService {
  constructor(private token: WebStorageService) { }

  getJsonHeader() {
    return new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getFormUrlEncodedHeader() {
    return new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  }

  getDefaultHeader() {
    return new HttpHeaders({ 'Content-Type': 'text/plain; charset=utf-8' })
  }

  getHeader(headerType: string) {
    let headerData = {};
    switch (headerType) {
      case 'application/json':
        headerData['headers'] = this.getJsonHeader();
        break;
      case 'application/x-www-form-urlencoded':
        headerData['headers'] = this.getFormUrlEncodedHeader();
        break;
      default:
        headerData['headers'] = this.getDefaultHeader();
        break;
    }
    return headerData;
  }

  getHttpParamsByData(data: any) {
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      if (data[key] !== null && data[key] !== undefined) {
        httpParams = httpParams.append(key, data[key]);
      } else {
        httpParams = httpParams.append(key, '');
      }
    });
    return httpParams;
  }


}
