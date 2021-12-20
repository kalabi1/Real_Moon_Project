import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SaMessage } from '../../../../../models/sa-message.model';
import { acConfig } from '../../../../../app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SA1011Service } from '../../../../../services/sa1011/sa1011-service';
@Component({
  selector: 'app-sa1011',
  templateUrl: './sa1011.component.html'
})
export class SA1011Component implements OnInit {

  public messengerTypeList: { id: string, name: string }[] = [
    { "id": "CH", "name": "Chairman Message" },
    { "id": "MD", "name": "Managing Director Message" },
    { "id": "DI", "name": "Director Message" }
  ];
  public editMode = false;
  public saMessage = new SaMessage;
  public listActiveIndex = 0;
  public messengerPhotoFile: File;
  public messengerPhotoUrl: string;

  constructor(private http: HttpClient,
    private sa1011Service: SA1011Service,
    private toastr: ToastrService, ) { }

  @ViewChild('fileInput')
  messengerPhotoVariable: ElementRef;

  ngOnInit() {
    this.onClickActiveIndex(this.listActiveIndex);
  }

  onClickActiveIndex(i) {
    this.listActiveIndex = i;
    this.getMessage(this.messengerTypeList[i].id)
    this.editMode = true;
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
        if (this.saMessage.messengerPhotoName) {
          this.messengerPhotoUrl = acConfig.fileUrl + this.saMessage.messengerPhotoName;
        } else {
          this.messengerPhotoUrl = ''
        }
        console.log(this.saMessage)
      })
      .catch(console.log);
  }

  onClickSaveMessage() {
    if (this.messengerPhotoFile != null) {
      let body = new FormData();
      // Add file content to prepare the request
      body.append("multipartFile", this.messengerPhotoFile);
      // Launch post request
      this.http.post(`${acConfig.apiUrl}/files/upload-file`, body)
        .subscribe(
          (data) => {
            this.saMessage.messengerPhotoName = JSON.parse(JSON.stringify(data)).fileName;
            this.readyToUpdate();
          },
          // Or errors :-(
          error => {
            console.log(error);
            this.toastr.error('Unable to Upload');
            // tell us if it's finished
            () => { console.log("completed") }
          }
        );
    }
    else {
      this.readyToUpdate();
    }
  }


  readyToUpdate() {
    this.sa1011Service.updateMessage(this.saMessage).subscribe(
      result => {
        this.toastr.success('Updated Successfully');
        this.saMessage = new SaMessage(result);
        if (this.saMessage.messengerPhotoName) {
          this.messengerPhotoUrl = acConfig.fileUrl + this.saMessage.messengerPhotoName;
        } else {
          this.messengerPhotoUrl = '';
        }
        this.clearMessengerPhoto();
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

  clearMessengerPhoto() {
    this.messengerPhotoVariable.nativeElement.value = null;
    this.messengerPhotoFile = null;
  }

  messengerFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.messengerPhotoFile = event.target.files[0];
    }
  }
}
