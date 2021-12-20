import { FlatDetails } from './../../../../../models/flat-details.model';
import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../../../app.config'
import { VideoService } from './../../../../../services/videoService/video.service';
import { fixedValues } from '../../../../../fixedValues'
import { ActivatedRoute } from '@angular/router';
import { FlatService } from './../../../../../services/falt-size/flat-service';
import { FlatSize } from '../../../../../models/flat-size.model';
import { DataService } from './../../../../../services/land-project/data-service';
import { SliderService } from './../../../../../services/siderController/slider-service';
import { AlertService } from '../../../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-rl1004',
  templateUrl: './rl1004.component.html'
})

export class Rl1004Component implements OnInit {
  public flat;
  public atozList = fixedValues.atoz;
  public facingList;
  public uomList;
  public projectList: any = []
  public regionList: any = []
  public subregionList: any = []
  public sizeList = new Array<FlatSize>();
  public videosList: any = [];
  public roadSizeList: any = [];
  public projectLayoutPhotoUrl: string;
  public sliderList: any = [];
  public sliderbaseUrl;
  public projectLayoutPhotoFile: File;
  projectNo;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private dataService: DataService,
    private sliderService: SliderService,
    private alertService: AlertService,
    private toastr: ToastrService,
    private videoService: VideoService,
    private flatService: FlatService) {
    this.flat = new FlatDetails();
  }
  public editMode = false;

  @ViewChild('fileInput')
  myInputVariable: ElementRef;
  @ViewChild('fileInput2')
  myInputVariable2: ElementRef;

  ngOnInit() {
    console.log("acConfig", acConfig);
    this.sliderbaseUrl = acConfig.fileUrl;
    this.getFacingList();
    this.getRoadSizeList();
    const id = this.route.snapshot.params.id;
    this.projectNo = this.route.snapshot.params.id;
    this.getProjectList();
    this.getRegionList();
    this.getUomList();
    if (id) {
      this.getApartment(id);
      this.getItemVideos(id);
      this.editMode = true;
    } else {
      this.editMode = false;
    }
  }

  clearProfilePicture() {
    this.myInputVariable.nativeElement.value = "";
  }


  getApartment(id) {
    this.http.get(`${acConfig.apiUrl}/rl/project/land/get-project`, {
      params: {
        projectNo: id
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.flat = new FlatDetails(response.body);
        this.projectLayoutPhotoUrl = acConfig.fileUrl + this.flat.projectLayoutPhoto;
        this.onChangeGetSubRegionList()
      })
      .catch(console.log);
    if (id) {
      this.getSliderList(id);
    }
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

  onChangeProject() {
    let arr = this.projectList.filter(x => x.projectNo == this.flat.projectNo);
    this.flat.approvalNo = arr[0].approvalNo;
    this.flat.projectType = arr[0].projectType;
    this.flat.projectLocation = arr[0].projectLocation;
  }
  onClickSave() {
    this.onClickUploadProjectLayoutPhoto('I');
  }
  readyToSave() {
    this.dataService.saveLandProject(this.flat).subscribe(
      result => {
        this.flat = new FlatDetails(result);
        this.editMode = true;
        this.projectLayoutPhotoUrl = acConfig.fileUrl + this.flat.projectLayoutPhoto;
        this.toastr.success('Saved Successfully');
        this.clearProfilePicture();
      },
      err => {
        // Do stuff whith your error
        if (err.text == "insert successful") {
          this.toastr.error('Unable to Save');

        }
      },
      () => {
        // Do stuff after completion
      }
    );
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

            this.flat.projectLayoutPhoto = JSON.parse(JSON.stringify(data)).fileName;
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

  getRoadSizeList() {
    this.http.get(`${acConfig.apiUrl}/rl/configuration/road-size/`, {
      params: {
        // projectNo: '84'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.roadSizeList = JSON.parse(JSON.stringify(response.body));
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
  readyToUpdate() {
    this.dataService.updateLandProject(this.flat).subscribe(
      result => {
        console.log('Update');
        this.flat = new FlatDetails(result);
        this.projectLayoutPhotoUrl = acConfig.fileUrl + this.flat.projectLayoutPhoto;
        this.toastr.success('Updated Successfully');
        this.clearProfilePicture();
      },
      err => {
        // Do stuff whith your error
        if (err.text == "insert successful") {
          // alert("sucessfully Update");
          this.toastr.error('Unable to Update');
        }
      },
      () => {
        // Do stuff after completion
      }
    );
  }
  onClickUpdate() {
    this.onClickUploadProjectLayoutPhoto('U');
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

  getProjectList() {
    this.http.get(`${acConfig.apiUrl}/rl/project/ap/`, {
      params: {
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.projectList = response.body;
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
        regionNo: this.flat.regionNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.subregionList = response.body;
      })
      .catch(console.log);
  }

  onClickNew() {
    this.videosList = [];
    this.sliderList = [];
    this.flat = new FlatDetails();
    this.editMode = false;
    this.clearProfilePicture();
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
      })
      .catch(console.log);
  }

  onClickUploadImage() {
    if (!this.myInputVariable2.nativeElement.value) {
      return;
    }
    let body = new FormData();
    this.myInputVariable2.nativeElement.value = "";
    // Add file content to prepare the request
    body.append("multipartFile", this.multipartFile);
    body.append("projectNo", this.flat.projectNo);
    // Launch post request
    this.http.post(`${acConfig.apiUrl}/rl/project/slider/add`, body)
      .subscribe(
        // Admire results

        (data) => {
          console.log(data)
          this.toastr.success('Uploaded Successfully');
          if (this.projectNo) {
            this.getSliderList(this.projectNo);
          } else if (this.flat.projectNo) {
            this.getSliderList(this.flat.projectNo);
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
  onClickDeleteSlider(sliderNo, index) {
    this.alertService.danger("Do you want to delete ?", true).then(data => {
      if (data) {
        this.sliderService.deleteProjectSlider(sliderNo).subscribe(result => {
          // alert(result.deleteStatus);
          this.toastr.success('Deleted Successfully');
          this.sliderList.splice(index, 1);
        }, err => {
          this.toastr.error('Unable to Delete');
          // this.sliderList.splice(index, 1);
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
    this.videoService.saveVideo(this.flat).subscribe(result => {
      console.log(result);
      this.flat.videoTitle = null
      this.flat.youtubeVideoLink = null
      this.getItemVideos(this.flat.projectNo);
      this.toastr.success('Uploaded Successfully');
    })
    error => {
      console.log(error);
      this.toastr.error('Unable to Upload');
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

  onClickDelete(projectNo) {
    this.alertService.danger("Do you want to delete ?", true).then(data => {
      if (data) {
        this.dataService.deleteLandProject(projectNo).subscribe(result => {
          this.onClickNew();
          this.toastr.success('Deleted Successfully');

        }, err => {
          this.toastr.error('Unable to Delete');
        });
      }
    })
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
    this.flat.videoNo = item.videoNo;
    this.flat.videoTitle = item.videoTitle;
    this.flat.youtubeVideoLink = item.youtubeVideoLink;
  }
  onClickUpdateVideo() {
    this.videoService.updateVideo(this.flat).subscribe(result => {
      this.toastr.success("Update Successfully");
      this.videoUpdateFlag = false;
      this.flat.videoTitle = null;
      this.flat.youtubeVideoLink = null;
      this.getItemVideos(this.flat.projectNo);
    }, err => {
      this.toastr.success("Unable to Update");
    })
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
}
