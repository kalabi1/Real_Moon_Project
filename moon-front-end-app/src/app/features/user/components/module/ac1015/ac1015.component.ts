import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
import { acConfig } from '../../../../../app.config';
import { AcBa } from '../../../../../models/ac-ba.model';
import { Ac1015Service } from '../../../../../services/ac1015/ac1015-service';

@Component({
  selector: 'app-ac1015',
  templateUrl: './ac1015.component.html'
})
export class AC1015Component implements OnInit {

  public ba = new AcBa();
  public baList = new Array<AcBa>();
  public editMode = false;
  public listActiveIndex = 0;


  constructor(private http: HttpClient,
    private alertService: AlertService,
    private toastr: ToastrService,
    private ac1015Service: Ac1015Service) { }

  ngOnInit() {
    this.getAcBaList();
  }

  onClickActiveIndex(i) {
    this.listActiveIndex = i;
    this.editMode = true;
  }

  // Get Cost Center List For Parent Cost Center
  getAcBaList() {
    this.http.get(`${acConfig.apiUrl}/ac/ba/`, {
      params: {
        // projectNo: '84'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.baList.length = 0;
        // this.baList = JSON.parse(JSON.stringify(response.body));
        this.baList = JSON.parse(JSON.stringify(response.body)).map(element => {
          if (element.baNo !== this.ba.baNo) { return new AcBa(element) }
        });
        console.log(this.baList)
      })
      .catch(console.log);
  }

  onclickSaveCostcenter() {
    this.ac1015Service.saveBa(this.ba).subscribe(
      result => {
        console.log('successfully Save');
        this.toastr.success('Saved Successfully');
        this.editMode = true;
        this.ba = new AcBa(result);
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


  onclickUpdateBa() {
    this.ac1015Service.updateBa(this.ba).subscribe(
      result => {
        console.log('successfully Save');
        this.toastr.success('Saved Successfully');
        this.ba = new AcBa(result);
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

        this.ac1015Service.deleteBa(this.ba.baNo).subscribe(
          result => {
            this.toastr.success('Deleted successfully ');
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
    this.ba = new AcBa();
    // this.getTrnBalanceList();
  }

}
