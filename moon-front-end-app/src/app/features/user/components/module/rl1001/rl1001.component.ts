import { Component, OnInit } from '@angular/core';
import { RlFacing } from '../../../../../models/rl-facing.model';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../../../app.config';
import { Rl1001Service } from '../../../../../services/rl1001/rl1001-service';
import { AlertService } from '../../../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
import { RlRoadSize } from '../../../../../models/rl-road-size.model';
import { InUom } from '../../../../../models/in-uom.model';
import { RlPlotPosition } from '../../../../../models/rl-plot-position.model';
import { RlConfig } from '../../../../../models/rl-config.model';
@Component({
  selector: 'app-rl1001',
  templateUrl: './rl1001.component.html'
})
export class RL1001Component implements OnInit {
  public facingList = new Array<RlFacing>();
  public positionList = new Array<RlPlotPosition>();
  public roadSizeList = new Array<RlRoadSize>();
  public uomList = new Array<InUom>();
  public rlConfig = new RlConfig();


  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private toastr: ToastrService,
    private rl1001Service: Rl1001Service
  ) { }

  ngOnInit() {
    this.getFacingList();
    this.getPositionList();
    // this.getRoadSizeList();
    this.getUomList();
    this.getRlConfig();
  }

  // details
  getFacingList() {
    this.http.get(`${acConfig.apiUrl}/rl/configuration/facing/`, {
      params: {
        // projectNo: '84'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.facingList.length = 0;
        this.facingList = JSON.parse(JSON.stringify(response.body));
      })
      .catch(console.log);
  }

  // Get Position List
  getPositionList() {
    this.http.get(`${acConfig.apiUrl}/rl/configuration/position/`, {
      params: {
        // projectNo: '84'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.positionList = JSON.parse(JSON.stringify(response.body));
      })
      .catch(console.log);
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
        this.roadSizeList.length = 0;
        this.roadSizeList = JSON.parse(JSON.stringify(response.body));
      })
      .catch(console.log);
  }

  getUomList() {
    this.http.get(`${acConfig.apiUrl}/in/configuration/uom/`, {
      params: {
        // projectNo: '84'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.uomList.length = 0;
        this.uomList = JSON.parse(JSON.stringify(response.body));
      })
      .catch(console.log);
  }

  // Add New Facing Element
  onClickAddNewFacing() {
    this.facingList.push(new RlFacing());
  }

  // Add New Position Element
  onClickAddNewPosition() {
    this.positionList.push(new RlPlotPosition());
  }

  // Add New Road Size
  onClickAddNewRoadSize() {
    this.roadSizeList.push(new RlRoadSize());
  }
  // Add New Road Size
  onClickAddNewUom() {
    this.uomList.push(new InUom());
  }


  // Save RL Facing
  onClickSaveRlFacingList() {
    this.rl1001Service.saveRlFacingList(this.facingList).subscribe(
      result => {
        this.facingList = result;
        this.toastr.success('Saved successfully');
      },
      err => {
        // Do stuff whith your error
        if (err.text === 'insert successful') {
          this.toastr.error('Unable to save');
        }
      },
      () => {
        // Do stuff after completion
      }
    );
  }


  // Save RL Configuration
  onClickSaveRlConfiguration() {
    this.rlConfig.sl = 1;
    this.rl1001Service.saveRlConfig(this.rlConfig).subscribe(
      result => {
        this.rlConfig = new RlConfig(result);
        this.toastr.success('Saved successfully');
      },
      err => {
        // Do stuff whith your error
        if (err.text === 'insert successful') {
          this.toastr.error('Unable to save');
        }
      },
      () => {
        // Do stuff after completion
      }
    );
  }

  getRlConfig() {
    this.http.get(`${acConfig.apiUrl}/rl/configuration/get-config/`, {
      params: {
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.rlConfig = new RlConfig(response.body);
      })
      .catch(console.log);
  }

  // Save RL Position
  onClickSaveRlPositionList() {
    this.rl1001Service.saveRlPositionList(this.positionList).subscribe(
      result => {
        this.positionList = result;
        this.toastr.success('Saved successfully ');
      },
      err => {
        // Do stuff whith your error
        if (err.text === 'insert successful') {
          this.toastr.error('Unable to save');
        }
      },
      () => {
        // Do stuff after completion
      }
    );
  }

  // Save Road Size List
  onClickSaveRoadSizeList() {
    this.rl1001Service.saveRlRoadSizeList(this.roadSizeList.filter(size => size.roadSize > 0)).subscribe(
      result => {
        this.roadSizeList = result;
        this.toastr.success('Saved successfully ');
      },
      err => {
        // Do stuff whith your error
        if (err.text === 'insert successful') {
          this.toastr.error('Unable to save');
        }
      },
      () => {
        // Do stuff after completion
      }
    );
  }

  // Save Uom List
  onClickSaveUomList() {
    this.rl1001Service.saveInUomList(this.uomList).subscribe(
      result => {
        this.uomList = result;
        this.toastr.success('Saved successfully ');
      },
      err => {
        // Do stuff whith your error
        if (err.text === 'insert successful') {
          this.toastr.error('Unable to save');
        }
      },
      () => {
        // Do stuff after completion
      }
    );
  }

  onClickDeleteFacing(facingNo, index) {
    if (facingNo) {
      this.alertService.danger("Do you want to delete ?", true).then(data => {
        if (data) {
          this.rl1001Service.deleteRlFacing(facingNo).subscribe(result => {
            this.facingList.splice(index, 1);
            this.toastr.success('Deleted Successfully');
          }, err => {
            this.toastr.error('Unable to Delete');
            console.log(err);
          });
        }
      })
    } else {
      this.facingList.splice(index, 1);
    }
  }

  // Plot Position Delete
  onClickDeletePosition(positionNo, index) {
    console.log(index);
    if (positionNo) {
      this.alertService.danger("Do you want to delete ?", true).then(data => {
        if (data) {
          this.rl1001Service.deleteRlPosition(positionNo).subscribe(result => {
            this.positionList.splice(index, 1);
            this.toastr.success('Deleted Successfully');
          }, err => {
            this.toastr.error('Unable to Delete');
            console.log(err);
          });
        }
      })
    } else {
      this.positionList.splice(index, 1);
    }

  }

  onClickDeleteRoadSize(sizeNo, index) {
    console.log(index);
    if (sizeNo) {
      this.alertService.danger("Do you want to delete ?", true).then(data => {
        if (data) {
          this.rl1001Service.deleteRlRoadSize(sizeNo).subscribe(result => {
            this.roadSizeList.splice(index, 1);
            this.toastr.success('Deleted Successfully');
          }, err => {
            this.toastr.error('Unable to Delete');
            console.log(err);
          });
        }
      })
    } else {
      this.roadSizeList.splice(index, 1);
    }
  }

  onClickDeleteuom(uomNo, index) {
    console.log(index);
    if (uomNo) {
      this.alertService.danger("Do you want to delete ?", true).then(data => {
        if (data) {
          this.rl1001Service.deleteInUom(uomNo).subscribe(result => {
            this.uomList.splice(index, 1);
            this.toastr.success('Deleted Successfully');
          }, err => {
            this.toastr.error('Unable to Delete');
            console.log(err);
          });
        }
      })
    } else {
      this.uomList.splice(index, 1);
    }
  }
}


