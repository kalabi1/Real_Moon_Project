import { Injectable } from "@angular/core";
import { BaseDataService } from "../base-data-service";
import { acConfig } from '../../app.config';
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})
export class Ac1007Service {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }

    // save SA Gallery
    public saveCostcenter(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/ac/cost/add`, params);
    }
    public updateCostcenter(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/ac/cost/update`, params);
    }
    public deleteCostcenter(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/ac/cost/delete?costNo =${params}`);
    }

    

}