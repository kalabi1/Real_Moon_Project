import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { acConfig } from '../../../app.config'
import { ItemService } from './../../../services/appartment/item-service';
import { setTheme } from 'ngx-bootstrap/utils';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-project-list-plot',
    templateUrl: './project-list-plot.compnent.html',
})
export class ProjectListPlotComponent implements OnInit {
    public prjectList: any = [];
    public sliderbaseUrl;
    public id;
    public curPage = 1;
    public regionList: any = []
    public subregionList: any = []
    public listViewType = 1;

    // Filtering Variable
    projectTypeNo = '1'
    projectType = ''
    projectStatus = ''
    projectRegion = ''
    regionNo: any = '';
    subregionNo: any = '';
    publicFlag: any = '1';

    constructor(private http: HttpClient, private router: Router, private itemService: ItemService, private route: ActivatedRoute) {
        setTheme('bs4'); // or 'bs4'
    }

    ngOnInit() {
        this.getRegionList();
        this.id = this.route.snapshot.params.id;
        if (this.id) {
            this.getProjectListWithType(this.id);
        }
        else {
            this.getProjectList();
        }
        this.sliderbaseUrl = acConfig.fileUrl;
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
            })
            .catch(console.log);
    }

    onClickChangeType(value) {
        this.listViewType = value;
    }

    onClickSearch() {

        if (this.id) {
            this.getProjectListWithType(this.id);
        }
        else {
            this.getProjectList();
        }
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

}
