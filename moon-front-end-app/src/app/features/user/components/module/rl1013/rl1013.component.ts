import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../../../app.config'
import { Plot } from '../../../../../models/plot.model';
import { fixedValues } from '../../../../../fixedValues'
import { ActivatedRoute } from '@angular/router';
import { FlatSize } from '../../../../../models/flat-size.model';

@Component({
  selector: 'app-rl1013',
  templateUrl: './rl1013.component.html'
})
export class RL1013Component implements OnInit {
  public plot;
  public atozList = fixedValues.atoz;
  public rajuApprovalList;
  public facingList;
  public sizeList = new Array<FlatSize>();

  constructor(private http: HttpClient,
    private route: ActivatedRoute) {
    this.plot = new Plot();
  }
  public editMode = false;
  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if (id) {
      this.getApartment(id);
      this.getSizeList(id);
      this.editMode = true;
    } else {
      this.editMode = false;
    }
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
        console.log("response", response);
        this.plot = new Plot(response.body);
      })
      .catch(console.log);
  }

  getSizeList(id) {
    this.http.get(`${acConfig.apiUrl}/rl/project/ap/size/get-item-size-list/`, {
      params: {
        projectNo: id
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

}
