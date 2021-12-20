import { Component, OnInit } from '@angular/core';
import { AcChart } from '../../../../../models/ac-chart.model';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../../../core/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
import { acConfig } from '../../../../../app.config';
import { Ac1006Service } from '../../../../../services/ac1006/ac1006-service';
import * as $ from 'jquery';
import { AcNature } from '../../../../../models/ac-nature.model';
function getMenu(parentID, data) {

  let fnData = data;

  return fnData.filter(function (node) {
    return (node.parentAccNo === parentID);
  }).map(function (node) {
    var exists = fnData.some(function (childNode) {
      return childNode.parentAccNo === node.accNo;
    });
    var subMenu = (exists) ? '<ul class="dropdown">' + getMenu(node.accNo, fnData).join('') + '</ul>' : "";
    if (!node.connectByIsleaf) {
      return '<li><p class="has-submenu mb-0" rel="' + node.accNo + '"><span class="menu-text">' + node.accName + '</span><i class="fa fa-angle-down"></i></p>' + subMenu + '</li>';
    } else {
      return '<li><p class="active-menu mb-0" rel="' + node.accNo + '" > <span class="sub-menu-text" > ' + node.accName + ' </span>' + subMenu + '</p> </li>'
    }
  });
}

@Component({
  selector: 'app-ac1006',
  templateUrl: './ac1006.component.html'
})
export class AC1006Component implements OnInit {
  public acChart = new AcChart();
  public acChartList = new Array<AcChart>();
  public acCharParentList;
  public editMode = false;
  public acNature = new AcNature();

  public navArray = [];
  htmlStr: string = '';

  constructor(private http: HttpClient,
    private alertService: AlertService,
    private toastr: ToastrService,
    private ac1006Service: Ac1006Service) { }

  ngOnInit() {

    this.getAllNavMenu();
  }

  // Get Ac Chart List
  getAcChartList() {
    this.http.get(`${acConfig.apiUrl}/ac/chart/`, {
      params: {
        // projectNo: '84'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.acChartList = JSON.parse(JSON.stringify(response.body));
        this.acCharParentList = JSON.parse(JSON.stringify(response.body)).filter(x => x.accNo !== this.acChart.accNo);
      })
      .catch(console.log);
  }

  onclickSaveChart() {
    this.ac1006Service.saveAcChart(this.acChart).subscribe(
      result => {
        console.log('successfully Save');
        this.toastr.success('Saved Successfully');
        this.editMode = true;
        this.acChart = new AcChart(result);
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


  onclickUpdateAcChart() {
    this.ac1006Service.updateAcChart(this.acChart).subscribe(
      result => {
        this.toastr.success('Saved Successfully');
        this.acChart = new AcChart(result);
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

  onClickdeleteAcChart() {
    this.alertService.danger("Do you want to delete ?", true).then(data => {
      if (data) {
        this.ac1006Service.deleteAcChart(this.acChart.accNo).subscribe(
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
    this.acChart = new AcChart();
  }

  // details
  getChartDetails(accNo) {
    this.http.get(`${acConfig.apiUrl}/ac/chart/get-chart`, {
      params: {
        accNo: accNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.acChart = new AcChart(JSON.parse(JSON.stringify(response.body)));
        this.getAcNature(this.acChart.natureNo);
        this.getAcChartList();
        this.editMode=true;
      })
      .catch(console.log);
  }


  getAcNature(natureNo) {
    this.http.get(`${acConfig.apiUrl}/ac/nature/get-nature`, {
      params: {
        natureNo: natureNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.acNature = new AcNature(JSON.parse(JSON.stringify(response.body)));
        this.acChart.natureNameCode = this.acNature.natureName + ' ' + this.acNature.natureCode
      })
      .catch(console.log);
  }

  getAllNavMenu() {
    this.ac1006Service.getAccTreeList().subscribe(data => {
      this.navArray = JSON.parse(JSON.stringify(data));
      console.log(this.navArray)
      this.loadClickEvent(this.navArray);
    })
  }

  loadClickEvent(_nav) {
    this.htmlStr = getMenu(null, _nav).join('');
    let that = this;

    $(document).ready(function () {
      $('.chart-of-account-tree .has-submenu').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.next().hasClass('menu-show')) {
          $this.next().removeClass('menu-show');
          $this.next().slideUp(350);
        } else {
          $this.next().toggleClass('menu-show');
          $this.next().slideToggle(350);
        }
      });

      $('.chart-of-account-tree .active-menu').on('click', function (e) {
        e.preventDefault();
        if ($(this).attr('rel').substr(0, 1) !== 'P') {
          that.getChartDetails($(this).attr('rel'))
        }

        $('.chart-of-account-tree .active-menu').removeClass('active');
        $(this).addClass('active');
      });

    })
  }
}
