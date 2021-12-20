import { Item } from './../../../models/project.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { acConfig } from '../../../app.config';
import { VideoService } from './../../../services/videoService/video.service';
import { SliderService } from './../../../services/sliderService/slider-service';
import { CartService } from './../../../services/add-to-cart.service';
import { v4 as uuidv4 } from 'uuid';
import { RlContact } from './../../../models/rl-property-contact.model';
import { AlertService } from '../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-feature-product-detail',
  templateUrl: './feature-product-details.component.html',
})
export class FeatureProductDetailComponent implements OnInit {
  public itemObj: Item;
  public sliderbaseUrl;
  public sliderList: any = [];
  public rlitemInstallmentList: any = [];
  public videosList: any = [];
  public curPage = 1;
  public featureItemList: any = [];
  public sliderActiveIndex = 0;
  public contact = new RlContact();
  public languageoption: string;
  public languageoptiondescr: string;
  public gItemNo: number;
  public aprovalinfo = false;
  roadSideName: string;
  priceNegotiableFlagvalue: string;
  uuid: string;
  roadSisdeName: string;
  powerDivisionAapFlagvalue: string;
  wasaAapFlagvalue: string;
  fireAndSafetyAapFlagvlaue: string;
  trafficControlAuthAapFlagvalue: string;
  municipalityAapFlagvalue: string;
  wordCommAapFlagvalue: string;
  unionCouncileAapFlagvalue: string;
  policeStationAapFlagvalue: string;
  deptOfEnvAapFlagvalue: string;
  civilAviationAapFlagvalue: string;
  gasAapFlagvalue: string;

  public cartList: any = [];
  public cartAddcheck;
  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private videoService: VideoService,
    private router: Router,
    private alertService: AlertService,
    private toastr: ToastrService,
    private cartService: CartService,
    private sliderService: SliderService
  ) {
    this.itemObj = new Item();

    router.events.subscribe((val) => {
    });
  }
  ngOnInit() {
    this.languageoption = 'E';
    this.languageoptiondescr = 'EN';
    this.uuid = uuidv4();
    const id = this.route.snapshot.params.id;
    this.gItemNo = id;

    this.sliderbaseUrl = acConfig.fileUrl;

    if (id) {
      this.getAppartment(id);
      this.getSliderList(id);
      this.getItemVideos(id);
      this.getRlItemInstallmentList(id);
      this.getFeatureList(id);
    }
    this.route.queryParams.subscribe(queryParams => {
      // do something with the query params
      console.log("working", queryParams);
    });

    let tempList = this.cartService.getCarts();
    this.cartList = Object.values(tempList);
    let tempArray = this.cartList.filter(x => x.itemNo == id);
    this.cartAddcheck = (tempArray.length) > 0 ? true : false;
  }

  onClickSliderThumbnail(index) {
    this.sliderActiveIndex = index;
  }

  onClickshowaprovalinfo() {
    this.aprovalinfo = !this.aprovalinfo;
  }

  getAppartment(id) {
    this.http.get(`${acConfig.apiUrl}/rl/cu/item/details`, {
      params: {
        itemNo: id
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.itemObj = new Item(response.body);
        this.itemObj.descr = this.getEditorValue(this.itemObj.descr)
        this.itemObj.descrBn = this.getEditorValue(this.itemObj.descrBn)
        this.itemObj.termsAndCondition = this.getEditorValue(this.itemObj.termsAndCondition)
        this.itemObj.termsAndConditionBn = this.getEditorValue(this.itemObj.termsAndConditionBn)
        if (this.itemObj.decorationCondition.toUpperCase() === 'W') {
          this.itemObj.decorationCondition = 'Well furnished'
        } else if (this.itemObj.decorationCondition.toUpperCase() === 'N') {
          this.itemObj.decorationCondition = 'Non furnished'
        };
        if (this.itemObj.roadSide === 1) {
          this.roadSideName = 'One Side Road'
        } else if (this.itemObj.roadSide === 2) {
          this.roadSideName = 'Two Side Road'
        }
        else if (this.itemObj.roadSide === 2) {
          this.roadSideName = 'Three Side Road'
        };

        if (this.itemObj.powerDivisionAapFlag === 0) {
          this.powerDivisionAapFlagvalue = 'No'
        } else if (this.itemObj.powerDivisionAapFlag === 1) {
          this.powerDivisionAapFlagvalue = 'Yes'
        };
        if (this.itemObj.wasaAapFlag === 0) {
          this.wasaAapFlagvalue = 'No'
        } else if (this.itemObj.wasaAapFlag === 1) {
          this.wasaAapFlagvalue = 'Yes'
        };
        if (this.itemObj.fireAndSafetyAapFlag === 0) {
          this.fireAndSafetyAapFlagvlaue = 'No'
        } else if (this.itemObj.fireAndSafetyAapFlag === 1) {
          this.fireAndSafetyAapFlagvlaue = 'Yes'
        };
        if (this.itemObj.municipalityAapFlag === 0) {
          this.municipalityAapFlagvalue = 'No'
        } else if (this.itemObj.municipalityAapFlag === 1) {
          this.municipalityAapFlagvalue = 'Yes'
        };
        if (this.itemObj.wordCommAapFlag === 0) {
          this.wordCommAapFlagvalue = 'No'
        } else if (this.itemObj.wordCommAapFlag === 1) {
          this.wordCommAapFlagvalue = 'Yes'
        };
        if (this.itemObj.unionCouncileAapFlag === 0) {
          this.unionCouncileAapFlagvalue = 'No'
        } else if (this.itemObj.unionCouncileAapFlag === 1) {
          this.unionCouncileAapFlagvalue = 'Yes'
        };
        if (this.itemObj.policeStationAapFlag === 0) {
          this.policeStationAapFlagvalue = 'No'
        } else if (this.itemObj.policeStationAapFlag === 1) {
          this.policeStationAapFlagvalue = 'Yes'
        };
        if (this.itemObj.deptOfEnvAapFlag === 0) {
          this.deptOfEnvAapFlagvalue = 'No'
        } else if (this.itemObj.deptOfEnvAapFlag === 1) {
          this.deptOfEnvAapFlagvalue = 'Yes'
        };
        if (this.itemObj.trafficControlAuthAapFlag === 0) {
          this.trafficControlAuthAapFlagvalue = 'No'
        } else if (this.itemObj.trafficControlAuthAapFlag === 1) {
          this.trafficControlAuthAapFlagvalue = 'Yes'
        } else if (this.itemObj.trafficControlAuthAapFlag === 2) {
          this.trafficControlAuthAapFlagvalue = 'On Process'
        };
        if (this.itemObj.civilAviationAapFlag === 0) {
          this.civilAviationAapFlagvalue = 'No'
        } else if (this.itemObj.civilAviationAapFlag === 1) {
          this.civilAviationAapFlagvalue = 'Yes'
        } else if (this.itemObj.civilAviationAapFlag === 2) {
          this.civilAviationAapFlagvalue = 'On Process'
        };
        if (this.itemObj.priceNegotiableFlag === 1) {
          this.priceNegotiableFlagvalue = 'Yes'
        } else if (this.itemObj.priceNegotiableFlag === 0) {
          this.priceNegotiableFlagvalue = 'No'
        };
        if (this.itemObj.gasAapFlag === 1) {
          this.gasAapFlagvalue = 'Yes'
        } else if (this.itemObj.gasAapFlag === 0) {
          this.gasAapFlagvalue = 'No'
        };
      })
      .catch(console.log);
  }

  getFeatureList(id) {
    this.http.get(`${acConfig.apiUrl}/rl/item/ap/get-featured-item`, {
      params: {
        itemNo: id
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        //this.featureItemList = response.body;
        this.featureItemList = JSON.parse(JSON.stringify(response.body)).map(element => {
          element['itemBrandPhoto'] = this.sliderbaseUrl + element.itemBrandPhoto;
          return element;
        });
      })
      .catch(console.log);
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
        //this.sizeList = response.body;
        this.rlitemInstallmentList.length = 0;
        this.rlitemInstallmentList = JSON.parse(JSON.stringify(response.body));
        // this.sizeList.push()
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

  onClickAddToCart() {
    this.cartAddcheck = true;
    this.cartService.addCart({ 'uuid': this.uuid, 'itemNo': this.itemObj.itemNo });
    let tempList = this.cartService.getCarts();
    this.cartList = Object.values(tempList);
    document.getElementById('totalCart').innerText = this.cartList.length;
  }

  // RL Contact Property
  onclickSaveContact() {
    this.contact.itemNo = this.gItemNo;

    this.http.post(`${acConfig.apiUrl}/rl/property-contact/add`, this.contact)
      .subscribe((data) => {
        console.log(data);
        this.contact = new RlContact();
        this.toastr.success('Contact successfully');
      },
        error => {
          console.log(error);
          this.toastr.error('Contact fail');
        },
        () => {
          console.log('Completed')
        }
      );
  }

  // Toutube Player Control
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
  onClickMoreDetail(itenNo) {

  }
  getEditorValue(value) {
    value = value.replace(/\r|\n/g, "<br />").replace(/\*(.+?)\*/g, "<b>$1</b>")
    return value;
  }
}
