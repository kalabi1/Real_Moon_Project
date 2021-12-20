import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../app.config'
import { setTheme } from 'ngx-bootstrap/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { MouseEvent } from '@agm/core';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {
  public prjectList: any = [];
  public sliderbaseUrl;
  public curPage = 1;
  public listViewType = 1;
  public id;
  public regionList: any = []
  public subregionList: any = []

  // Filtering Variable
  projectTypeNo = '';
  projectType = ''
  projectStatus = ''
  projectRegion = ''
  regionNo: any = '';
  subregionNo: any = '';
  publicFlag: any = '1';

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    setTheme('bs4'); // or 'bs4'
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getRegionList();
    if (this.id) {
      this.getProjectListWithType(this.id);
      this.projectTypeNo = '2';
    }
    else {
      this.getProjectList();
      this.projectTypeNo = '';
    }
    this.sliderbaseUrl = acConfig.fileUrl;

  }

  onClickSearch() {
    if (this.id) {
      this.getProjectListWithType(this.id);
    }
    else {
      this.getProjectList();
    }
  }

  getProjectListWithType(id) {
    this.http.get(`${acConfig.apiUrl}/rl/cu/project/`, {
      params: {
        projectTypeNo: id,
        projectType: this.projectType,
        projectStatus: this.projectStatus,
        projectRegion: this.projectRegion,
        publicFlag: this.publicFlag

      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.prjectList = JSON.parse(JSON.stringify(response.body)).map(element => {
          element['itemBrandPhoto'] = this.sliderbaseUrl + element.projectLayoutPhoto;
          return element;
        });
        if (this.prjectList.projectStatus.toUpperCase() === 'OG') {
          this.prjectList.projectType = 'Sale going on'
        } else if (this.prjectList.projectStatus.toUpperCase() === 'CP') {
          this.prjectList.projectStatus = 'Complete Project'
        } else if (this.prjectList.projectStatus.toUpperCase() === 'UP') {
          this.prjectList.projectStatus = 'Upcoming Project'
        };
        console.log("", this.prjectList);
        console.log("this.prjectList", this.prjectList);
      })
      .catch(console.log);
  }

  getProjectList() {

    this.http.get(`${acConfig.apiUrl}/rl/cu/project/`, {
      params: {
        projectType: this.projectType,
        projectStatus: this.projectStatus,
        projectRegion: this.projectRegion

      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.prjectList = JSON.parse(JSON.stringify(response.body)).map(element => {
          element['itemBrandPhoto'] = this.sliderbaseUrl + element.projectLayoutPhoto;
          return element;
        });
        console.log("this.prjectList", this.prjectList);
      })
      .catch(console.log);
  }
  onClickChangeType(value) {
    this.listViewType = value;
  }
  onChangeProjectType() {
    if (this.projectTypeNo == '2') {
      this.router.navigate(['/project-list/2']);
    } else if (this.projectTypeNo == '1') {
      this.router.navigate(['/project-list-plot/1']);
    }
    else {
      this.router.navigate(['/project-list']);
    }
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
    this.http.get(`${acConfig.apiUrl}/sa/setting/subregion/list`, {
      params: {
        regionNo: this.regionNo
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.subregionList = response.body;
      })
      .catch(console.log);
  }



  // for map
  // google maps zoom level
  zoom: number = 18;

  // initial center position for the map
  lat: number = 23.7806713;
  lng: number = 90.4120624;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
    {
      lat: 23.7806713,
      lng: 90.4120624,
      label: 'A',
      draggable: true
    },
  ]
}
// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
