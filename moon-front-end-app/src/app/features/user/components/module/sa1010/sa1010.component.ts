import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AlertService } from '../../../../../core/popup/service/alert.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SaGallery } from '../../../../../models/sa-gallery.model';
import { SA1010Service } from '../../../../../services/sa1010/sa1010-service';
import { acConfig } from '../../../../../app.config';

@Component({
  selector: 'app-sa1010',
  templateUrl: './sa1010.component.html'
})
export class SA1010Component implements OnInit {

  public gallery = new SaGallery();
  public galleryPhotoFile: File;
  public galleryThumbFile: File;
  public editMode = false;
  public galleryPhotoUrl: string;
  public galleryThumbUrl: string;
  public galleryList;
  public listActiveIndex = 0;

  constructor(private http: HttpClient,
    private alertService: AlertService,
    private toastr: ToastrService,
    private sa1010Service: SA1010Service) { }

  @ViewChild('fileInput')
  galleryPhotoVariable: ElementRef;
  @ViewChild('thumbInput')
  galleryThumbVariable: ElementRef;

  ngOnInit() {
    this.getGalleryList();
  }

  onClickSave() {
    this.onClickSaveGallery('I');
  }

  onClickUpdate() {
    this.onClickSaveGallery('U');
  }

  onClickSaveGallery(trnType) {
    if (this.galleryPhotoFile != null) {
      let body = new FormData();
      // Add file content to prepare the request
      body.append("multipartFile", this.galleryPhotoFile);
      // Launch post request
      this.http.post(`${acConfig.apiUrl}/files/upload-file`, body)
        .subscribe(
          (data) => {
            this.gallery.galleryPhotoName = JSON.parse(JSON.stringify(data)).fileName;
            if (this.galleryThumbFile != null) {
              let body = new FormData();
              // Add file content to prepare the request
              body.append("multipartFile", this.galleryThumbFile);
              // Launch post request
              this.http.post(`${acConfig.apiUrl}/files/upload-file`, body)
                .subscribe(
                  (data) => {
                    this.gallery.galleryThumbName = JSON.parse(JSON.stringify(data)).fileName;
                    if (trnType === 'U') {
                      this.readyToUpdate();
                    } else if (trnType === 'I') {
                      this.readyToSave();
                    }
                  },
                  error => {
                    this.toastr.error('Unable to Upload');
                    () => { console.log("completed") }
                  }
                );
            } else {
              if (trnType === 'U') {
                this.readyToUpdate();
              } else if (trnType === 'I') {
                this.readyToSave();
              }
            }
          },
          error => {
            this.toastr.error('Unable to Upload');
            () => { console.log("completed") }
          }
        );
    }
    else {
      if (this.galleryThumbFile != null) {
        let body = new FormData();
        // Add file content to prepare the request
        body.append("multipartFile", this.galleryThumbFile);
        // Launch post request
        this.http.post(`${acConfig.apiUrl}/files/upload-file`, body)
          .subscribe(
            (data) => {
              this.gallery.galleryThumbName = JSON.parse(JSON.stringify(data)).fileName;
              if (trnType === 'U') {
                this.readyToUpdate();
              } else if (trnType === 'I') {
                this.readyToSave();
              }
            },
            error => {
              this.toastr.error('Unable to Upload');
              () => { console.log("completed") }
            }
          );
      } else {
        if (trnType === 'U') {
          this.readyToUpdate();
        } else if (trnType === 'I') {
          this.readyToSave();
        }
      }
    }
  }


  readyToSave() {
    this.sa1010Service.saveGallery(this.gallery).subscribe(
      result => {
        this.toastr.success('Saved Successfully');
        this.gallery = new SaGallery(result);
        if (this.gallery.galleryPhotoName) {
          this.galleryPhotoUrl = acConfig.fileUrl + this.gallery.galleryPhotoName;
        } else {
          this.galleryPhotoUrl = '';
        }
        if (this.gallery.galleryThumbName) {
          this.galleryThumbUrl = acConfig.fileUrl + this.gallery.galleryThumbName;
        } else {
          this.galleryThumbUrl = '';
        }
        this.editMode = true;
        this.galleryList.push(this.gallery);
        this.onClickActiveIndex(this.galleryList.length - 1)
        this.clearGalleryPhoto();
        this.clearThumbPhoto();
      },
      err => {
        // Do stuff whith your error
        if (err.text == 'insert successful') {
          this.toastr.success('Saved Successfully');
        }
        this.toastr.error('Unable to Save');
      },
      () => {
        // Do stuff after completion
      }
    );
  }

  readyToUpdate() {
    this.sa1010Service.updateGallery(this.gallery).subscribe(
      result => {
        this.toastr.success('Updated Successfully');
        this.gallery = new SaGallery(result);
        if (this.gallery.galleryPhotoName) {
          this.galleryPhotoUrl = acConfig.fileUrl + this.gallery.galleryPhotoName;
        } else {
          this.galleryPhotoUrl = '';
        }
        if (this.gallery.galleryThumbName) {
          this.galleryThumbUrl = acConfig.fileUrl + this.gallery.galleryThumbName;
        } else {
          this.galleryThumbUrl = '';
        }
        this.galleryList[this.listActiveIndex] = this.gallery;
        this.clearGalleryPhoto();
        this.clearThumbPhoto();
      },
      err => {
        // Do stuff whith your error
        this.toastr.error('Unable to Update');
      },
      () => {
        // Do stuff after completion
      }
    );
  }

  onClickActiveIndex(i) {
    this.listActiveIndex = i;
    this.gallery = new SaGallery(this.galleryList[i]);
    if (this.gallery.galleryPhotoName) {
      this.galleryPhotoUrl = acConfig.fileUrl + this.gallery.galleryPhotoName;
    } else {
      this.galleryPhotoUrl = '';
    }
    if (this.gallery.galleryThumbName) {
      this.galleryThumbUrl = acConfig.fileUrl + this.gallery.galleryThumbName;
    } else {
      this.galleryThumbUrl = '';
    }
    this.editMode = true;
  }

  getGalleryList() {
    this.http.get(`${acConfig.apiUrl}/sa/gallery/`, {
      params: {
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.galleryList = response.body;
        this.onClickActiveIndex(0);
      })
      .catch(console.log);
  }

  onClickDelete() {
    this.alertService.danger("Do you want to delete ?", true).then(data => {
      if (data) {
        this.sa1010Service.deleteGallery(this.gallery.galleryNo).subscribe(result => {
          this.galleryList.splice(this.listActiveIndex, 1);
          this.toastr.success('Deleted Successfully');
          this.onClickNew();
          this.onClickActiveIndex(0);
        }, err => {
          this.toastr.error('Unable to Delete');
        });
      }
    })
  }

  galleryFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.galleryPhotoFile = event.target.files[0];
    }
  }

  galleryThumbChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.galleryThumbFile = event.target.files[0];
    }
  }

  clearGalleryPhoto() {
    this.galleryPhotoVariable.nativeElement.value = null;
    this.galleryPhotoFile = null;
  }
  clearThumbPhoto() {
    this.galleryThumbVariable.nativeElement.value = null;
    this.galleryThumbFile = null;
  }


  onClickNew() {
    this.gallery = new SaGallery();
    this.editMode = false;
    this.galleryPhotoUrl = '';
    this.galleryThumbUrl = '';
    this.clearGalleryPhoto();
    this.clearThumbPhoto();
  }
}
