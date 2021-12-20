import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../../../app.config';
import { Plot } from '../../../../../models/plot.model';
import { VideoService } from './../../../../../services/videoService/video.service';
import { fixedValues } from '../../../../../fixedValues'
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../../services/appartment/data-service';
import { FlatService } from '../../../../../services/falt-size/flat-service';
import { FlatSize } from '../../../../../models/flat-size.model';
import { SliderService } from './../../../../../services/siderController/slider-service';
import { AlertService } from '../../../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-rl1003',
  templateUrl: './rl1003.component.html',
})
export class rl1003Component implements OnInit {
  public plot;
  public atozList = fixedValues.atoz;
  public facingList;
  public uomList;
  public sliderList;
  public projectLayoutPhotoFile: File;
  public sizeList = new Array<FlatSize>();
  public projectLayoutPhotoUrl: string;
  public sliderbaseUrl;
  public videosList: any = [];
  public subregionList: any = []
  public regionList: any = []

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private sliderService: SliderService,
    private dataService: DataService,
    private videoService: VideoService,
    private alertService: AlertService,
    private toastr: ToastrService,
    private flatService: FlatService) {
    this.plot = new Plot();
    console.log('plot', this.plot);
  }

  @ViewChild('fileInput')
  myInputVariable: ElementRef;
  @ViewChild('fileInput2')
  myInputVariable2: ElementRef;

  public editMode = false;
  public projectNo;

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.projectNo = this.route.snapshot.params.id;
    this.sliderbaseUrl = acConfig.fileUrl;
    if (id) {
      this.getApartment(id);
      this.getItemVideos(id);
      this.editMode = true;
    } else {
      this.editMode = false;
      this.sizeList.push(new FlatSize());
    }
    this.getRegionList();
    this.getFacingList();
    this.getUomList();
  }

  clearProfilePicture() {
    this.myInputVariable.nativeElement.value = null;
  }

  getApartment(id) {
    this.http.get(`${acConfig.apiUrl}/rl/project/ap/get-project/`, {
      params: {
        projectNo: id
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        console.log('response', response);
        this.plot = new Plot(response.body);
        this.projectLayoutPhotoUrl = acConfig.fileUrl + this.plot.projectLayoutPhoto;
        this.onChangeGetSubRegionList()
        console.log('this.plot', this.plot);
        this.getSizeList();
        if (id) {
          this.getSliderList(id);
        }
      })
      .catch(console.log);
  }

  // Item Brand Photo Select

  changeBrandFile(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.projectLayoutPhotoFile = event.target.files[0];
    }
  }

  onClickUploadProjectLayoutPhoto(trnType) {
    if (this.projectLayoutPhotoFile != null) {
      let body = new FormData();
      // Add file content to prepare the request
      body.append("multipartFile", this.projectLayoutPhotoFile);
      // Launch post request
      this.http.post(`${acConfig.apiUrl}/files/upload-file`, body)
        .subscribe(
          (data) => {

            this.plot.projectLayoutPhoto = JSON.parse(JSON.stringify(data)).fileName;
            if (trnType === 'U') {
              this.readyToUpdate();
            } else if (trnType === 'I') {
              this.readyToSave();
            }
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
      if (trnType === 'U') {
        this.readyToUpdate();
      } else if (trnType === 'I') {
        this.readyToSave();
      }
    }
  }

  readyToSave() {
    this.dataService.saveApartment(this.plot).subscribe(
      result => {
        console.log('successfully Save');
        // alert('successfully Save Appartment');
        this.toastr.success('Saved Successfully');
        this.plot = new Plot(result);
        this.projectLayoutPhotoUrl = acConfig.fileUrl + this.plot.projectLayoutPhoto;
        this.editMode = true;
        this.clearProfilePicture();
        this.getSizeList();
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

  onClickSave() {
    this.onClickUploadProjectLayoutPhoto('I');
  }

  onClickUpdate() {
    this.onClickUploadProjectLayoutPhoto('U');
  }

  readyToUpdate() {
    this.dataService.updateApartment(this.plot).subscribe(
      result => {
        console.log('Update');
        this.toastr.success('Updated Successfully');
        this.plot = new Plot(result);
        this.projectLayoutPhotoUrl = acConfig.fileUrl + this.plot.projectLayoutPhoto;
        this.clearProfilePicture();
        this.getSizeList();
      },
      err => {
        this.toastr.error('Unable to Update');
      },
      () => {
        // Do stuff after completion
      }
    );
  }


  getFacingList() {
    this.http.get(`${acConfig.apiUrl}/rl/configuration/facing/`, {
      params: {
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.facingList = response.body;
      })
      .catch(console.log);
  }

  getRegionList() {
    this.http.get(`${acConfig.apiUrl}/sa/setting/region/`, {
      params: {
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.regionList = response.body;

      })
      .catch(console.log);
  }

  onChangeGetSubRegionList() {
    this.http.get(`${acConfig.apiUrl}/sa/setting/subregion/`, {
      params: {
        regionNo: this.plot.regionNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.subregionList = response.body;
      })
      .catch(console.log);
  }

  getUomList() {
    this.http.get(`${acConfig.apiUrl}/in/configuration/uom/`, {
      params: {
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.uomList = response.body;
      })
      .catch(console.log);
  }


  // details
  getSizeList() {
    this.http.get(`${acConfig.apiUrl}/rl/project/ap/size/get-item-size-list/`, {
      params: {
        projectNo: this.plot.projectNo
        //projectNo: '84'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.sizeList.length = 0;
        this.sizeList = JSON.parse(JSON.stringify(response.body));
        if (this.sizeList.length === 0) {
          let element = {
            projectNo: this.plot.projectNo
          };
          this.sizeList.push(new FlatSize(element));
        }

      })
      .catch(console.log);
  }


  onClickAddDetails() {
    if (!this.plot.projectNo) {
      alert('First Save Master');
      return true;
    }
    let element = {
      projectNo: this.plot.projectNo
    };
    this.sizeList.push(new FlatSize(element));
    console.log('this.sizeList', this.sizeList);
  }

  onClickSaveDetails() {
    if (!this.plot.projectNo) {
      alert('First Save Master');
      return true;
    }
    this.flatService.saveFlatSize(this.sizeList).subscribe(
      result => {
        this.toastr.success('Saved Successfully');
        this.editMode = true;
        this.sizeList = result;
      },
      err => {
        // Do stuff whith your error
        if (err.text == 'insert successful') {
          this.toastr.error('Unable to Save');
        }
      },
      () => {
        // Do stuff after completion
      }
    );
  }

  onClickNew() {
    this.sizeList = new Array<FlatSize>();
    this.videosList = [];
    this.sliderList = [];
    this.plot = new Plot();
    this.editMode = false;
    this.projectLayoutPhotoUrl = '';
    this.clearProfilePicture();
  }

  onClickDeleteSize(sizeNo, index) {
    if (sizeNo) {
      this.alertService.danger("Do you want to delete ?", true).then(data => {
        if (data) {
          console.log(index)
          this.flatService.deleteFlatSize(sizeNo).subscribe(result => {
            this.sizeList.splice(index, 1);
            console.log(result)
            this.toastr.success('Deleted Successfully');
          }, err => {
            this.toastr.error('Unable to Delete');
            this.sizeList.splice(index, 1);
            console.log(err)
          });
        }
      })
    } else {
      this.sizeList.splice(index, 1);
    }
  }

  public sliderImage;
  getSliderList(projectNo) {
    this.http.get(`${acConfig.apiUrl}/rl/project/slider/get-project-slider-list`, {
      params: {
        projectNo: projectNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.sliderList = JSON.parse(JSON.stringify(response.body)).map(element => {
          element['imagePath'] = this.sliderbaseUrl + element.imageName;
          return element;
        });
        console.log('slider list', this.sliderList);
      })
      .catch(console.log);
  }

  onClickUploadImage() {
    if (!this.myInputVariable2.nativeElement.value) {
      return;
    }
    let body = new FormData();
    // Add file content to prepare the request
    body.append('multipartFile', this.multipartFile);
    body.append('projectNo', this.plot.projectNo);
    // Launch post request
    this.http.post(`${acConfig.apiUrl}/rl/project/slider/add`, body)
      .subscribe(
        // Admire results
        (data) => {
          console.log(data)
          this.plot.multipartFile = null
          this.toastr.success('Uploaded Successfully');
          this.myInputVariable2.nativeElement.value = null;
          this.clearProfilePicture();
          if (this.projectNo) {
            this.getSliderList(this.projectNo);
          } else if (this.plot.projectNo) {
            this.getSliderList(this.plot.projectNo);
          }
        },
        // Or errors :-(
        error => {
          console.log(error),
            this.toastr.error('Unable to Upload');
          // tell us if it's finished
          () => { console.log('completed') }
        }
      )
  }

  onClickDeleteSlider(sliderNo, index) {
    this.alertService.danger("Do you want to delete ?", true).then(data => {
      if (data) {
        this.sliderService.deleteProjectSlider(sliderNo).subscribe(result => {
          this.toastr.success('Deleted Successfully');
          this.sliderList.splice(index, 1);
        }, err => {
          alert(err.text);
          this.toastr.error('Unable to Delete');
        });
      }
    })
  }

  onClickDelete() {
    this.alertService.danger("Do you want to delete ?", true).then(data => {
      if (data) {
        this.dataService.deleteApartment(this.plot.projectNo).subscribe(result => {
          this.toastr.success('Deleted Successfully');
          this.onClickNew();
        }, err => {
          this.toastr.error('Unable to Delete');
        });
      }
    })
  }

  multipartFile: File;
  fileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.multipartFile = event.target.files[0];
    }
  }


  onClickSaveVideo() {
    this.videoService.saveVideo(this.plot).subscribe(result => {
      console.log(result);
      this.plot.videoTitle = null
      this.plot.youtubeVideoLink = null
      this.getItemVideos(this.plot.projectNo);
      this.toastr.success('Uploaded Successfully');
    })
    err => {
      this.toastr.error('Unable to Upload')
    }
  }


  getItemVideos(projectNo) {
    this.http.get(`${acConfig.apiUrl}/rl/video/get-project-video-list`, {
      params: {
        projectNo: projectNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.videosList.length = 0;
        this.videosList = JSON.parse(JSON.stringify(response.body));
      })
      .catch(console.log);
  }




  player: YT.Player;
  id: string = 'qDuKsiwS5xw';

  playerVars = {
    cc_lang_pref: 'en'
  };
  // private player;
  private ytEvent;

  onStateChange(event) {
    this.ytEvent = event.data;
  }
  savePlayer(player) {
    this.player = player;
  }

  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

  onClickDeleteVideo(videoNo, index) {
    this.alertService.danger("Do you want to delete ?", true).then(data => {
      if (data) {
        this.videoService.deleteVideo(videoNo).subscribe(result => {
          this.videosList.splice(index, 1);
          this.toastr.success('Deleted Successfully');
        }, err => {
          this.toastr.error('Unable to Delete');
        })
      }
    })
  }
  videoUpdateFlag = false;
  onClikUpdateFlag(item) {
    this.videoUpdateFlag = true;
    this.plot.videoTitle = item.videoTitle;
    this.plot.youtubeVideoLink = item.youtubeVideoLink;
    this.plot.videoNo = item.videoNo;
  }
  onClickUpdateVideo() {
    this.videoService.updateVideo(this.plot).subscribe(result => {
      this.toastr.success("Updated Successfully");
      this.videoUpdateFlag = false;
      this.plot.videoTitle = null
      this.plot.youtubeVideoLink = null
      this.getItemVideos(this.plot.projectNo);
    }, err => {
      this.toastr.success("Unable to Update");
    })
  }
}
