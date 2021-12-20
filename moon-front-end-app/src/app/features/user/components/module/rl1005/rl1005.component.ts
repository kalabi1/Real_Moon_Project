import { FlatDetails } from './../../../../../models/flat-details.model';
import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../../../app.config'
import { fixedValues } from '../../../../../fixedValues'
import { ActivatedRoute } from '@angular/router';
import { FlatService } from './../../../../../services/falt-size/flat-service';
import { FlatSize } from '../../../../../models/flat-size.model';
import { DataService } from './../../../../../services/rl1005/rl1005-service';
import { VideoService } from './../../../../../services/videoService/video.service';
import { SliderService } from './../../../../../services/siderController/slider-service';
import { RlItemInstallment } from '../../../../../models/rl-item-installment.model';
import { RlItemInstallmentService } from './../../../../../services/rl-item-installment/rl-item-installment-service';
import { AlertService } from '../../../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-rl1005',
  templateUrl: './rl1005.component.html',
})
export class Rl1005Component implements OnInit {
  public flat;
  public atozList = fixedValues.atoz;
  public facingList;
  public itemList: any = [];
  public projectList: any = []
  public sizeList = new Array<FlatSize>();
  public rlitemInstallmentList = new Array<RlItemInstallment>();
  public videosList: any = [];
  public itemBrandPhotoFile: File;
  public itemBrandPhotoUrl: string;
  public sliderList: any = [];
  public sliderbaseUrl;
  public uomList;
  public itemSearch = false;
  public itemNo;
  public selectedProjectNo;
  public selectedItemNo;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private videoService: VideoService,
    private sliderService: SliderService,
    private dataService: DataService,
    private rlItemInstallmentService: RlItemInstallmentService,
    private alertService: AlertService,
    private toastr: ToastrService,
    private flatService: FlatService) {
    this.flat = new FlatDetails();
    console.log("flat", this.flat)
  }

  @ViewChild('fileInput')
  myInputVariable: ElementRef;
  @ViewChild('fileInput2')
  myInputVariable2: ElementRef;

  public editMode = false;

  clearProfilePicture() {
    this.myInputVariable.nativeElement.value = "";
  }

  ngOnInit() {
    this.getFacingList();
    this.getProjectList();
    const id = this.route.snapshot.params.id;
    this.sliderbaseUrl = acConfig.fileUrl;
    if (id) {
      this.getApartment(id, 0);
      this.getSliderList(id);
      this.getItemVideos(id);
      this.getRlItemInstallmentList(id);
      this.editMode = true;
    } else {
      this.editMode = false;
      this.rlitemInstallmentList.push(new RlItemInstallment());
    }
    this.getUomList();
    this.getItemList();
  }

  onClickNew() {
    this.rlitemInstallmentList = new Array<RlItemInstallment>();
    this.videosList = [];
    this.sliderList = [];
    this.flat = new FlatDetails();
    this.editMode = false;
    this.rlitemInstallmentList.push(new RlItemInstallment());
    this.clearProfilePicture();
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

  getApartment(id, newFlag) {
    this.http.get(`${acConfig.apiUrl}/rl/item/ap/get-item`, {
      params: {
        itemNo: id
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        console.log("response", response);
        this.flat = new FlatDetails(response.body);
        this.itemBrandPhotoUrl = acConfig.fileUrl + this.flat.itemBrandPhoto;
        if (this.flat.projectStatus = 'OG') {
          this.flat.projectStatus = 'Sale Going On';
        } else if (this.flat.projectStatus = 'CP') {
          this.flat.projectStatus = 'Complete Project';
        } else if (this.flat.projectStatus = 'UP') {
          this.flat.projectStatus = 'Upcoming Project';
        }
        if (newFlag === 1) {
          this.flat.itemNo = '';
          this.flat.itemId = '';
        }
      })
      .catch(console.log);
  }
  onChangeGetItemList() {
    this.getItemList();
  }

  onChangeGetItemDetails(data) {
    this.getApartment(this.selectedItemNo, data);
    if (data === 0) {
      this.getSliderList(this.selectedItemNo);
      this.getItemVideos(this.selectedItemNo);
      this.getRlItemInstallmentList(this.selectedItemNo);
      this.editMode = true;
    }
  }

  onChangeProject() {
    let arr = this.projectList.filter(x => x.projectNo == this.flat.projectNo);
    console.log("this.flat.projectNo, ", this.flat.projectNo);
    console.log(this.projectList.filter(x => x.projectNo == this.flat.projectNo));
    this.flat.approvalNo = arr[0].approvalNo;
    this.flat.projectType = arr[0].projectType;

    if (this.flat.projectType = 'R') {
      this.flat.projectTypeName = 'Residential';
    } else if (this.flat.projectType = 'C') {
      this.flat.projectTypeName = 'Commercial';
    } else if (this.flat.projectType = 'RC') {
      this.flat.projectTypeName = 'Residential Cum Commercial';
    }

    if (this.flat.projectStatus = 'OG') {
      this.flat.projectStatus = 'Sale Going On';
    } else if (this.flat.projectStatus = 'CP') {
      this.flat.projectStatus = 'Complete Project';
    } else if (this.flat.projectStatus = 'UP') {
      this.flat.projectStatus = 'Upcoming Project';
    }
    this.flat.projectLocation = arr[0].projectLocation;
  }

  onClickSave() {
    this.onClickUploadItemBrandPhoto('I');
  }

  readyToSave() {
    this.dataService.saveApartment(this.flat).subscribe(
      result => {
        this.flat = new FlatDetails(result);
        this.toastr.success('Saved Successfully');
        this.editMode = true;
        this.itemBrandPhotoUrl = acConfig.fileUrl + this.flat.itemBrandPhoto;
        this.clearProfilePicture();
        this.rlitemInstallmentList = []
        let element = {
          itemNo: this.flat.itemNo
        };
        this.rlitemInstallmentList.push(new RlItemInstallment(element));
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

  readyToUpdate() {
    this.dataService.updateApartment(this.flat).subscribe(
      result => {
        this.toastr.success('Updated Successfully');
        this.flat = new FlatDetails(result);
        this.itemBrandPhotoUrl = acConfig.fileUrl + this.flat.itemBrandPhoto;
        this.clearProfilePicture();
      },
      err => {
        // Do stuff whith your error
        if (err.text == "insert successful") {
          this.toastr.error('Unable to Update');
        }
      },
      () => {
        // Do stuff after completion
      }
    );
  }

  onClickUpdate() {
    this.onClickUploadItemBrandPhoto('U');
  }

  onClickShowItemSearch() {
    this.itemSearch = !this.itemSearch;
  }

  getItemList() {
    this.http.get(`${acConfig.apiUrl}/rl/item/ap/`, {
      params: {
        projectNo: this.selectedProjectNo ? this.selectedProjectNo : ''
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.itemList = response.body;
      })
      .catch(console.log);
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

  getItemVideos(itemNo) {
    this.http.get(`${acConfig.apiUrl}/rl/video/get-item-video-list`, {
      params: {
        itemNo: itemNo
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

  calculatePrice() {
    this.flat.totalPrice = Number(this.flat.price) * Number(this.flat.flatSize);
    this.flat.discountAmount = ((this.flat.totalPrice) * Number(this.flat.discountPct)) / 100;
    this.flat.netPrice = Number(this.flat.totalPrice) - Number(this.flat.discountAmount)
  }

  getSliderList(itemNo) {
    this.http.get(`${acConfig.apiUrl}/rl/item/slider/get-item-Slider-list`, {
      params: {
        itemNo: itemNo
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

  // Get RL Item Installment List
  getRlItemInstallmentList(itemNo) {
    this.http.get(`${acConfig.apiUrl}/rl/item/installment/get-item-installment-list`, {
      params: {
        itemNo: itemNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.rlitemInstallmentList.length = 0;
        this.rlitemInstallmentList = JSON.parse(JSON.stringify(response.body));
        if (this.rlitemInstallmentList.length === 0) {
          let element = {
            itemNo: this.flat.itemNo
          };
          this.rlitemInstallmentList.push(new RlItemInstallment(element));
        }
      })
      .catch(console.log);
  }

  // Delete RL Item Installment
  onClickDeleteRlItemInstallment(installementNo, index) {
    if (installementNo) {
      this.alertService.danger("Do you want to delete ?", true).then(data => {
        if (data) {
          this.rlItemInstallmentService.deleteRlItemInstallment(installementNo).subscribe(result => {
            this.rlitemInstallmentList.splice(index, 1);
            this.toastr.success('Deleted Successfully');
          }, err => {
            this.toastr.error('Unable to Delete');
            this.rlitemInstallmentList.splice(index, 1);
            console.log(err)
          });
        }
      })
    } else {
      this.rlitemInstallmentList.splice(index, 1);
    }
  }

  onClickDelete() {
    this.alertService.danger("Do you want to delete ?", true).then(data => {
      if (data) {
        this.dataService.deleteApartment(this.flat.itemNo).subscribe(result => {
          this.toastr.success('Deleted Successfully');
          this.onClickNew();
        }, err => {
          this.toastr.error('Unable to Delete');
        });
      }
    })
  }

  // Add new RL Item Installment
  onClickAddRlItemInstallment() {
    if (!this.flat.itemNo) {
      alert('First Save Master Data');
      return true;
    }
    let element = {
      itemNo: this.flat.itemNo
    };
    this.rlitemInstallmentList.push(new RlItemInstallment(element));
    console.log('this.rlitemInstallmentList', this.rlitemInstallmentList);
  }


  // Save RL Item Installment List
  onClickSaveRlItemInstallment() {
    if (!this.flat.itemNo) {
      this.toastr.success('First Save Master Data');
      return true;
    }
    this.rlItemInstallmentService.saveRlItemInstallment(this.rlitemInstallmentList).subscribe(
      result => {
        this.toastr.success('Saved Successfully');
        this.editMode = true;
        this.rlitemInstallmentList = result;
        console.log('save')
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

  onClickUploadImage() {
    let body = new FormData();
    if (!this.myInputVariable2.nativeElement.value) {
      return;
    }
    // Add file content to prepare the request
    body.append("multipartFile", this.multipartFile);
    body.append("itemNo", this.flat.itemNo);
    // Launch post request
    this.http.post(`${acConfig.apiUrl}/rl/item/slider/add`, body)
      .subscribe(
        (data) => {
          console.log(data)
          this.toastr.success('Uploaded Successfully');
          this.myInputVariable2.nativeElement.value = "";
          if (this.itemNo) {
            this.getSliderList(this.itemNo);
          } else if (this.flat.itemNo) {
            this.getSliderList(this.flat.itemNo);
          }
        },
        error => {
          this.toastr.error('Unable to Upload');
          () => { console.log("completed") }
        }
      );
  }

  onClickDeleteSlider(sliderNo, index) {
    this.alertService.danger("Do you want to delete ?", true).then(data => {
      if (data) {
        this.sliderService.deleteItemSlider(sliderNo).subscribe(result => {
          this.toastr.success('Deleted Successfully');
          this.sliderList.splice(index, 1);
        }, err => {
          alert(err.text);
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
    this.videoService.saveVideo(this.flat).subscribe(result => {
      this.flat.videoTitle = null
      this.flat.youtubeVideoLink = null
      this.toastr.success('Uploaded Successfully');
      this.getItemVideos(this.flat.itemNo);
    })
    error => {
      this.toastr.error('Unable to Upload');
    }
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
    this.flat.videoTitle = item.videoTitle;
    this.flat.youtubeVideoLink = item.youtubeVideoLink;
    this.flat.videoNo = item.videoNo;
  }
  onClickUpdateVideo() {
    this.videoService.updateVideo(this.flat).subscribe(result => {
      this.toastr.success("Update Successfully");
      this.videoUpdateFlag = false;
      this.getItemVideos(this.flat.itemNo);
      this.flat.videoTitle = null;
      this.flat.youtubeVideoLink = null;
      setTimeout(() => {
        this.getItemVideos(this.flat.itemNo);
      }, 100);
    }, err => {
      this.toastr.success("Unable to Update");
    })
  }

  // Item Brand Photo Select
  changeBrandFile(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.itemBrandPhotoFile = event.target.files[0];
    }
  }

  onClickUploadItemBrandPhoto(trnType) {
    if (this.itemBrandPhotoFile != null) {
      let body = new FormData();
      // Add file content to prepare the request
      body.append("multipartFile", this.itemBrandPhotoFile);
      // Launch post request
      this.http.post(`${acConfig.apiUrl}/files/upload-file`, body)
        .subscribe(
          (data) => {
            this.flat.itemBrandPhoto = JSON.parse(JSON.stringify(data)).fileName;
            if (trnType === 'U') {
              this.readyToUpdate();
            } else if (trnType === 'I') {
              this.readyToSave();
            }
          },
          error => {
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

  // Youtube Video Player Control
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
