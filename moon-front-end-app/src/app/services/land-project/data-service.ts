import { Injectable } from "@angular/core";
import { BaseDataService } from "../base-data-service";
import { acConfig } from '../../app.config';
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }

    // save Contact Form
    public saveLandProject(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/rl/project/land/add`, params);
    }
    public updateLandProject(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/rl/project/land/update`, params);
    }
    public deleteLandProject(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/rl/project/land/delete?projectNo=${params}`);
    }
}