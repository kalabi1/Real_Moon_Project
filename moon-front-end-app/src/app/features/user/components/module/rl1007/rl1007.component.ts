import { FlatDetails } from './../../../../../models/flat-details.model';
import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../../../app.config'
import { fixedValues } from '../../../../../fixedValues'
import { ActivatedRoute } from '@angular/router';
import { FlatService } from './../../../../../services/falt-size/flat-service';
import { FlatSize } from '../../../../../models/flat-size.model';
import { VideoService } from './../../../../../services/videoService/video.service';
import { SliderService } from './../../../../../services/siderController/slider-service';
import { Rl1007Service } from './../../../../../services/rl1007/rl1007-service';
import { RlItemInstallment } from '../../../../../models/rl-item-installment.model';
import { RlItemInstallmentService } from './../../../../../services/rl-item-installment/rl-item-installment-service';
import { AlertService } from '../../../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-rl1007',
  templateUrl: './rl1007.component.html'
})
export class Rl1007Component implements OnInit {
  public flat;
  public itemList: any = [];
  public atozList = fixedValues.atoz;
  public blockFromTo: any = [];
  public facingList;
  public positionList;
  public itemBrandPhotoFile: File;
  public itemBrandPhotoUrl: string;
  public projectList: any = []
  public sizeList = new Array<FlatSize>();
  public rlitemInstallmentList = new Array<RlItemInstallment>();
  public videosList: any = [];
  public itemSearch = false;
  public selectedProjectNo;
  public selectedItemNo;
  public sliderList: any = [];
  public sliderbaseUrl;
  itemNo;
  public editMode = false;
  public uomList;


  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private videoService: VideoService,
    private sliderService: SliderService,
    private rl1007Service: Rl1007Service,
    private flatService: FlatService,
    private alertService: AlertService,
    private toastr: ToastrService,
    private rlItemInstallmentService: RlItemInstallmentService) {
    this.flat = new FlatDetails();
  }

  @ViewChild('fileInput')
  myInputVariable: ElementRef;
  @ViewChild('fileInput2')
  myInputVariable2: ElementRef;


  ngOnInit() {
    this.getFacingList();
    this.getPositionList();
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

  clearProfilePicture() {
    this.myInputVariable.nativeElement.value = "";
  }

  onChangeGetItemList() {
    this.getItemList();
  }

  getProjectList() {

    this.http.get(`${acConfig.apiUrl}/rl/project/land/`, {
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

  getBlockFromAndFrom(from, to) {
    this.blockFromTo.length = 0;
    for (let i = from.charCodeAt(0); i <= to.charCodeAt(0); i++) {
      this.blockFromTo.push({ 'VALUE': String.fromCharCode(i), 'TEXT': String.fromCharCode(i) })
    }
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

  getApartment(id, newFlag) {
    this.http.get(`${acConfig.apiUrl}/rl/item/land/get-item`, {
      params: {
        itemNo: id
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.flat = new FlatDetails(response.body);
        this.itemBrandPhotoUrl = acConfig.fileUrl + this.flat.itemBrandPhoto;
        if (this.flat.projectStatus) {
          if (this.flat.projectStatus === 'OG') {
            this.flat.projectStatus = 'Sale going on';
          }
          else if (this.flat.projectStatus === 'CP') {
            this.flat.projectStatus = 'Complete Project';
          }
          else if (this.flat.projectStatus === 'UP') {
            this.flat.projectStatus = 'Upcoming Project';
          }
        }
        if (newFlag === 1) {
          this.flat.itemNo = '';
          this.flat.itemId = '';
          this.itemBrandPhotoUrl = '';
          this.flat.itemBrandPhoto = ''
        }
        this.getBlockFromAndFrom(this.flat.blockNameFrom, this.flat.blockNameTo);
      })
      .catch(console.log);
  }

  onChangeProject() {
    let arr = this.projectList.filter(x => x.projectNo == this.flat.projectNo);
    if (arr[0].projectStatus) {
      if (arr[0].projectStatus === 'OG') {
        this.flat.projectStatus = 'Sale going on';
      }
      else if (arr[0].projectStatus === 'CP') {
        this.flat.projectStatus = 'Complete Project';
      }
      else if (arr[0].projectStatus === 'UP') {
        this.flat.projectStatus = 'Upcoming Project';
      }
    }
    this.flat.projectType = arr[0].projectType;
    if (this.flat.projectType = 'R') {
      this.flat.projectTypeName = 'Residential';
    } else if (this.flat.projectType = 'C') {
      this.flat.projectTypeName = 'Commercial';
    } else if (this.flat.projectType = 'CO') {
      this.flat.projectTypeName = 'Condominium';
    }
    this.flat.projectLocation = arr[0].projectLocation;
    this.flat.blockNameFrom = arr[0].blockNameFrom;
    this.flat.blockNameTo = arr[0].blockNameTo;
    this.getBlockFromAndFrom(this.flat.blockNameFrom, this.flat.blockNameTo);
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

  readyToUpdate() {
    this.rl1007Service.updateLandItem(this.flat).subscribe(
      result => {
        this.toastr.success('Updated Successfully');
        this.flat = new FlatDetails(result);
        this.itemBrandPhotoUrl = acConfig.fileUrl + this.flat.itemBrandPhoto;
        this.clearProfilePicture();
        this.getSizeList();
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
  onClickShowItemSearch() {
    this.itemSearch = !this.itemSearch;
  }

  readyToSave() {
    this.rl1007Service.saveLandItem(this.flat).subscribe(
      result => {
        this.toastr.success('Saved Successfully');
        this.editMode = true
        this.itemBrandPhotoUrl = acConfig.fileUrl + this.flat.itemBrandPhoto;
        this.flat = new FlatDetails(result);
        this.clearProfilePicture();
        this.rlitemInstallmentList = []
        let element = {
          itemNo: this.flat.itemNo
        };
        this.rlitemInstallmentList.push(new RlItemInstallment(element));
      },
      err => {
        // Do stuff whith your error
        this.toastr.error('Unable to Save');
        if (err.text == "insert successful") {
        }
      },
      () => {
        // Do stuff after completion
      }
    );
  }

  onClickSave() {
    this.onClickUploadItemBrandPhoto('I');
  }

  onClickUpdate() {
    this.onClickUploadItemBrandPhoto('U');
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

  getPositionList() {
    this.http.get(`${acConfig.apiUrl}/rl/configuration/position/`, {
      params: {
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.positionList = response.body;
      })
      .catch(console.log);
  }


  //details
  getSizeList() {
    this.http.get(`${acConfig.apiUrl}/rl/project/ap/size/get-item-size-list/`, {
      params: {
        projectNo: this.flat.projectNo
        //projectNo: '84'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.sizeList.length = 0;
        this.sizeList = JSON.parse(JSON.stringify(response.body));
      })
      .catch(console.log);
  }

  onClickDeleteSize(sizeNo, index) {
    this.alertService.danger("Do you want to delete ?", true).then(data => {
      if (data) {
        this.flatService.deleteFlatSize(sizeNo).subscribe(result => {
          this.toastr.success('Deleted Successfully');
        }, err => {
          this.toastr.error('Unable to Delete');
        });
      }
    })
  }

  onClickSaveVideo() {
    let projectNo = this.flat.projectNo;
    this.flat.projectNo = '';
    this.videoService.saveVideo(this.flat).subscribe(result => {
      this.flat.videoTitle = null
      this.flat.youtubeVideoLink = null
      this.toastr.success('Uploaded Successfully');
      this.getItemVideos(this.flat.itemNo)
    })
    err => {
      this.toastr.error('Unable to Upload');
    }
    this.flat.projectNo = projectNo;

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
            this.toastr.success('Deleted Successfully');
            this.rlitemInstallmentList.splice(index, 1);
          }, err => {
            this.toastr.error('Unable to Delete');
            this.rlitemInstallmentList.splice(index, 1);
          });
        }
      })
    } else {
      this.rlitemInstallmentList.splice(index, 1);
    }
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
  }


  // Save RL Item Installment List
  onClickSaveRlItemInstallment() {
    if (!this.flat.itemNo) {
      alert('First Save Master Data');
      return true;
    }
    this.rlItemInstallmentService.saveRlItemInstallment(this.rlitemInstallmentList).subscribe(
      result => {
        this.toastr.success('Saved Successfully');
        this.editMode = true;
        this.rlitemInstallmentList = result;
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

  onClickDelete() {
    this.alertService.danger("Do you want to delete ?", true).then(data => {
      if (data) {
        this.rl1007Service.deleteLandItem(this.flat.itemNo).subscribe(result => {
          this.onClickNew();
          this.toastr.success('Deleted Successfully');
        }, err => {
          this.toastr.error('Unable to Delete');
        });
      }
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

  calculatePrice() {
    this.flat.totalPrice = Number(this.flat.price) * Number(this.flat.plotSize);
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
        console.log("slider list", this.sliderList);
      })
      .catch(console.log);
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
        });
  }
  onClickDeleteSlider(sliderNo, index) {
    this.alertService.danger("Do you want to delete ?", true).then(data => {
      if (data) {
        this.sliderService.deleteItemSlider(sliderNo).subscribe(result => {
          this.toastr.success('Deleted Successfully');
          this.sliderList.splice(index, 1);
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
      this.getItemVideos(this.flat.itemNo);
    }, err => {
      this.toastr.success("Unable to Update");
    })
  }
  getItemList() {
    this.http.get(`${acConfig.apiUrl}/rl/item/land/`, {
      params: {
        projectNo: this.selectedProjectNo ? this.selectedProjectNo : ''
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        console.log("response", response);
        this.itemList = response.body;
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
}
