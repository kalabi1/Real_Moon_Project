import { Injectable } from "@angular/core";
import { BaseDataService } from "../base-data-service";
import { acConfig } from '../../app.config';
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})
export class Sa1009Service {

    constructor(private apiService: BaseDataService, private http: HttpClient) { }

    public saveRegion(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/sa/setting/region/add`, params);
    }
    public updateRegion(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/sa/setting/region/update`, params);
    }
    public saveRegionList(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/sa/setting/region/add-list`, params);
    }
    public deleteRegion(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/sa/setting/region/delete?regionNo=${params}`);
    }

    // Subregion
    public saveSubregion(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/sa/setting/subregion/add`, params);
    }
    public saveSubregionList(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/sa/setting/subregion/add-list`, params);
    }
    public updateSubregionList(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/sa/setting/subregion/update-list`, params);
    }
    public updateSubregion(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/sa/setting/subregion/update`, params);
    }
    public deleteSubregion(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/sa/setting/subregion/delete?subregionNo=${params}`);
    }

}