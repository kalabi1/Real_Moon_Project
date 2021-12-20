import { Injectable } from "@angular/core";
import { BaseDataService } from "../base-data-service";
import { acConfig } from '../../app.config';
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})
export class Sa1004Service {

    constructor(private apiService: BaseDataService, private http: HttpClient) { }

    // Lookup Information
    public saveLookup(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/sa/setting/lookup/add`, params);
    }
    public saveLookupList(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/sa/setting/lookup/add-list`, params);
    }
    public updateLookup(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/sa/setting/lookup/update`, params);
    }
    public deleteLookup(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/sa/setting/lookup/delete?lookupNo=${params}`);
    }

   // Lookupdtl Information
    public saveLookupdtl(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/sa/setting/lookupdtl/add`, params);
    }
    public saveLookupdtlList(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/sa/setting/lookupdtl/add-list`, params);
    }
    public updateLookupdtlList(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/sa/setting/lookupdtl/update-list`, params);
    }
    public updateLookupdtl(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/sa/setting/lookupdtl/update`, params);
    }
    public deleteLookupdtl(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/sa/setting/lookupdtl/delete?lookupdtlNo=${params}`);
    }

}