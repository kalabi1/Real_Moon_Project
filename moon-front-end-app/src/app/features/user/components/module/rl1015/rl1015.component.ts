import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../../../app.config'
import { FlatDetails } from '../../../../../models/flat-details.model';
import { fixedValues } from '../../../../../fixedValues'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rl1015',
  templateUrl: './rl1015.component.html'
})
export class Rl1015Component implements OnInit {
  public flat;
  public atozList = fixedValues.atoz;
  public rajuApprovalList;
  public sizeList: any = [];
  constructor(private http: HttpClient,
    private route: ActivatedRoute) {
    this.flat = new FlatDetails();
  }
  public editMode = false;
  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if (id) {
      this.getApartment(id);
      this.editMode = true;
    } else {
      this.editMode = false;
    }
  }

  getApartment(id) {
    this.http.get(`${acConfig.apiUrl}/rl/item/ap/get-item`, {
      params: {
        itemNo: id
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.flat = new FlatDetails(response.body);
      })
      .catch(console.log);
  }



}
