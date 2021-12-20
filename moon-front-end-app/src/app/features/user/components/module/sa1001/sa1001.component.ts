import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../../../app.config';
import { SaCompany } from './../../../../../models/sa-company.model';
import { SA1001Service } from './../../../../../services/sa1001/sa1001-service';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from '../../../../../core/popup/service/alert.service';
@Component({
  selector: 'app-sa1001',
  templateUrl: './sa1001.component.html'
})
export class SA1001Component implements OnInit {
  public companyList: any = [];
  public listActiveIndex = 0;
  public company = new SaCompany;
  public sliderList;
  public editMode = false;
  public companyLogoFile: File;
  public companyFaviconFile: File;
  public companyLogoUrl;
  public companyFaviconUrl;
  public sliderFile: File;

  constructor(private http: HttpClient,
    private sa1001Service: SA1001Service,
    private toastr: ToastrService,
    private alertService: AlertService) { }

  @ViewChild('fileCompanyLogo')
  myInputLogoVariable: ElementRef;
  @ViewChild('fileCompanyFavicon')
  myInputFaviconVariable: ElementRef;
  @ViewChild('sliderFile')
  myInputSliderVariable: ElementRef;

  ngOnInit() {
    this.getCompanyList();
  }

  onClickActiveIndex(i) {
    this.listActiveIndex = i;
    this.company = new SaCompany(this.companyList[i]);
    this.companyLogoUrl = acConfig.fileUrl + this.company.companyLogoName;
    this.companyFaviconUrl = acConfig.fileUrl + this.company.companyFaviconName;
    this.getSliderList(this.company.companyNo);
  }

  getCompanyList() {
    this.http.get(`${acConfig.apiUrl}/sa/company/`, {
      params: {
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.companyList = response.body;
        this.onClickActiveIndex(0);
      })
      .catch(console.log);
  }

  onClickSave() {
    this.onClickUploadPhoto('I');
  }

  onClickUpdate() {
    this.onClickUploadPhoto('U');
  }

  readyToSave() {
    this.sa1001Service.saveCompany(this.company).subscribe(
      result => {
        this.toastr.success('Saved Successfully');
        this.company = new SaCompany(result);
        this.companyLogoUrl = acConfig.fileUrl + this.company.companyLogoName;
        this.companyFaviconUrl = acConfig.fileUrl + this.company.companyFaviconName;
        this.editMode = true;
        this.myInputLogoVariable.nativeElement.value = '';
        this.myInputFaviconVariable.nativeElement.value = '';
      },
      err => {
        // Do stuff whith your error
        this.toastr.error('Unable to Save');
      },
      () => {
        // Do stuff after completion
      }
    );
  }

  readyToUpdate() {
    this.sa1001Service.updateCompany(this.company).subscribe(
      result => {
        this.toastr.success('Updated Successfully');
        this.company = new SaCompany(result);
        this.companyLogoUrl = acConfig.fileUrl + this.company.companyLogoName;
        this.companyFaviconUrl = acConfig.fileUrl + this.company.companyFaviconName;
        this.editMode = true;
        this.myInputLogoVariable.nativeElement.value = '';
        this.myInputFaviconVariable.nativeElement.value = '';
      },
      err => {
        // Do stuff whith your error
        this.toastr.error('Unable to Updated');
      },
      () => {
        // Do stuff after completion
      }
    );
  }

  onClickUploadPhoto(trnType) {
    // Upload Company Logo
    if (this.companyLogoFile != null && this.companyFaviconFile != null) {
      let body = new FormData();
      // Add file content to prepare the request
      body.append('multipartFile', this.companyLogoFile);
      // Launch post request
      this.http.post(`${acConfig.apiUrl}/files/upload-file`, body)
        .subscribe(
          (data) => {
            this.company.companyLogoName = JSON.parse(JSON.stringify(data)).fileName;
            if (this.companyFaviconFile != null) {
              let body = new FormData();
              // Add file content to prepare the request
              body.append('multipartFile', this.companyFaviconFile);
              // Launch post request
              this.http.post(`${acConfig.apiUrl}/files/upload-file`, body)
                .subscribe(
                  (data) => {
                    this.company.companyFaviconName = JSON.parse(JSON.stringify(data)).fileName;
                    if (trnType === 'U') {
                      this.readyToUpdate();
                    } else if (trnType === 'I') {
                      this.readyToSave();
                    }
                  },
                  error => {
                    console.log(error);
                    this.toastr.error('Unable to Upload Favicon');
                    () => { console.log("completed") }
                  }
                );
            }
          },
          error => {
            this.toastr.error('Unable to Upload Logo');
            () => { console.log("completed") }
          }
        );
    }
    else if (this.companyLogoFile != null && this.companyFaviconFile == null) {
      let body = new FormData();
      // Add file content to prepare the request
      body.append('multipartFile', this.companyLogoFile);
      // Launch post request
      this.http.post(`${acConfig.apiUrl}/files/upload-file`, body)
        .subscribe(
          (data) => {
            this.company.companyLogoName = JSON.parse(JSON.stringify(data)).fileName;
            if (trnType === 'U') {
              this.readyToUpdate();
            } else if (trnType === 'I') {
              this.readyToSave();
            }
          },
          error => {
            this.toastr.error('Unable to Upload Logo');
            () => { console.log("completed") }
          }
        );
    }
    // Upload Company Favicon
    else if (this.companyFaviconFile != null && this.companyLogoFile == null) {
      let body = new FormData();
      // Add file content to prepare the request
      body.append('multipartFile', this.companyFaviconFile);
      // Launch post request
      this.http.post(`${acConfig.apiUrl}/files/upload-file`, body)
        .subscribe(
          (data) => {
            this.company.companyFaviconName = JSON.parse(JSON.stringify(data)).fileName;
            if (trnType === 'U') {
              this.readyToUpdate();
            } else if (trnType === 'I') {
              this.readyToSave();
            }
          },
          error => {
            console.log(error);
            this.toastr.error('Unable to Upload Favicon');
            // tell us if it's finished
            () => { console.log("completed") }
          }
        );
    }
    else {
      if (trnType === 'U') {
        this.readyToUpdate();
      } else if (trnType === 'I') {
        this.readyToSave();
      }
    }
  }

  changeCompanyLogo(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.companyLogoFile = event.target.files[0];
    }
  }

  changeCompanyFavicon(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.companyFaviconFile = event.target.files[0];
    }
  }

  onClickUploadImage() {

    let body = new FormData();
    // Add file content to prepare the request
    body.append('multipartFile', this.sliderFile);
    body.append("companyNo", JSON.parse(JSON.stringify(this.company.companyNo)));
    // Launch post request
    this.http.post(`${acConfig.apiUrl}/sa/company/slider/add`, body)
      .subscribe(
        (data) => {
          this.toastr.success('Uploaded Successfully');
          this.myInputSliderVariable.nativeElement.value = '';
          this.getSliderList(this.company.companyNo);
        },
        error => {
          this.toastr.error('Unable to Upload');
          () => { console.log("completed") }
        }
      );
  }

  getSliderList(companyNo) {
    this.http.get(`${acConfig.apiUrl}/sa/company/slider/get-company-wise`, {
      params: {
        companyNo: JSON.parse(JSON.stringify(this.company.companyNo))
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.sliderList = JSON.parse(JSON.stringify(response.body)).map(element => {
          element['imagePath'] = acConfig.fileUrl + element.sliderName;
          return element;
        });
      })
      .catch(console.log);
  }


  onClickDeleteSlider(sliderNo, index) {
    this.alertService.danger("Do you want to delete ?", true).then(data => {
      if (data) {
        this.http.delete(`${acConfig.apiUrl}/sa/company/slider/delete`, {
          params: {
            sliderNo: sliderNo
          },
          observe: 'response'
        }).subscribe(result => {
          this.toastr.success('Deleted Successfully');
          this.sliderList.splice(index, 1);
        }, err => {
          this.toastr.error('Unable to Delete');
        });
      }
    })
  }

  fileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.sliderFile = event.target.files[0];
    }
  }
}
