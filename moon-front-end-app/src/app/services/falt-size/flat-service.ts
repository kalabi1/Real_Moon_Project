import { Injectable } from "@angular/core";
import { BaseDataService } from "../base-data-service";
import { acConfig } from '../../app.config';
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})
export class FlatService {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }

    // save Contact Form
    public saveFlatSize(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/rl/project/ap/size/add-list`, params);
    }
    public deleteFlatSize(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/rl/project/ap/size/delete?sizeNo=${params}`);
    }
}