import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../app.config'
import { SaCompany } from './../../../models/sa-company.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  public company = new SaCompany();
  public companyLogoUrl;
  public companyFaviconUrl;

  constructor(
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.getCompanyInformation();
  }
  getCompanyInformation() {
    this.http.get(`${acConfig.apiUrl}/sa/company/get-company`, {
      params: {
        companyNo: '1'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        console.log("response", response);
        this.company = new SaCompany(response.body);
        this.companyLogoUrl = acConfig.fileUrl + JSON.parse(JSON.stringify(response.body)).companyLogoName;
        this.companyFaviconUrl = acConfig.fileUrl + JSON.parse(JSON.stringify(response.body)).companyLogoName;
      })
      .catch(console.log);
  }
}
