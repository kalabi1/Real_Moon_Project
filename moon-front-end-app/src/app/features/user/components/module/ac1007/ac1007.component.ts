import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
import { acConfig } from '../../../../../app.config';
import { AcCostcenter } from '../../../../../models/ac-costcenter.model';
import { Ac1007Service } from '../../../../../services/ac1007/ac1007-service';

@Component({
  selector: 'app-ac1007',
  templateUrl: './ac1007.component.html'
})
export class AC1007Component implements OnInit {
  public costCenter = new AcCostcenter();
  public costCenterList = new Array<AcCostcenter>();
  public editMode = false;
  public listActiveIndex = 0;


  constructor(private http: HttpClient,
    private alertService: AlertService,
    private toastr: ToastrService,
    private ac1007Service: Ac1007Service) { }

  ngOnInit() {
    this.getAcCostCenterList();
  }

  onClickActiveIndex(i) {
    this.listActiveIndex = i;
    this.editMode = true;
  }

  // Get Cost Center List For Parent Cost Center
  getAcCostCenterList() {
    this.http.get(`${acConfig.apiUrl}/ac/cost/`, {
      params: {
        // projectNo: '84'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.costCenterList.length = 0;
        this.costCenterList = JSON.parse(JSON.stringify(response.body)).map(element => {
          if (element.costNo !== this.costCenter.costNo) { return new AcCostcenter(element) }
        });
        console.log(this.costCenterList)
      })
      .catch(console.log);
  }

  onclickSaveCostcenter() {
    this.ac1007Service.saveCostcenter(this.costCenter).subscribe(
      result => {
        console.log('successfully Save');
        this.toastr.success('Saved Successfully');
        this.editMode = true;
        this.costCenter = new AcCostcenter(result);
        // this.rlCollectionList.splice(0, 0, this.rlCollection);
        this.onClickActiveIndex(0)
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


  onclickUpdateCostcenter() {
    this.ac1007Service.updateCostcenter(this.costCenter).subscribe(
      result => {
        console.log('successfully Save');
        // alert('successfully Save Apartment');
        this.toastr.success('Saved Successfully');
        this.costCenter = new AcCostcenter(result);
        this.editMode = true;
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

  onClickDeleteCostCenter() {
    this.alertService.danger("Do you want to delete ?", true).then(data => {
      if (data) {

        this.ac1007Service.deleteCostcenter(this.costCenter.costNo).subscribe(
          result => {
            this.toastr.success('Deleted successfully ');
            // this.rlCollectionList.splice(this.listActiveIndex,1);
            // this.tempTrnFilterList.splice(this.listActiveIndex,1);
            this.onClickAddNew();
          },
          err => {
            this.toastr.error('Unable to Delete');
          },
          () => {
            // Do stuff after completion
          }
        );

      }
    })

  }

  onClickAddNew() {
    this.editMode = false;
    this.costCenter = new AcCostcenter();
    // this.getTrnBalanceList();
    // this.rlCollection.collDate = new Date();
  }

}
