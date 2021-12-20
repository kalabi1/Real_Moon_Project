import { Injectable } from "@angular/core";
import { BaseDataService } from "../base-data-service";
import { acConfig } from '../../app.config';
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})
export class Rl1007Service {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }
 
    getAllLandItem() {
        return this.http.get(`${acConfig.apiUrl}/rl/item/land/`, {
            params: {
                
            },
            observe: 'response'
        }).toPromise();
            
    }

    public saveLandItem(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/rl/item/land/add`, params);
    }
    public updateLandItem(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/rl/item/land/update`, params);
    }
    public deleteLandItem(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/rl/item/land/delete?itemNo=${params}`);
    }
}