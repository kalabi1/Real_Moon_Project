import { Injectable } from "@angular/core";
import { BaseDataService } from "../base-data-service";
import { acConfig } from '../../app.config';
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})
export class Ac1015Service {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }

    // save SA Gallery
    public saveBa(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/ac/ba/add`, params);
    }
    public updateBa(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/ac/ba/update`, params);
    }
    public deleteBa(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/ac/ba/delete?baNo =${params}`);
    }
}