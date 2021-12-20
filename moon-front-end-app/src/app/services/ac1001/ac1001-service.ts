import { Injectable } from '@angular/core';
import { BaseDataService } from '../base-data-service';
import { acConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class Ac1001Service {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }

    // Save Voucher Type 
    public saveAcVtype(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/ac/configuration/vtype/add`, params);
    }

    public saveAcVtypeList(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/ac/configuration/vtype/add-list`, params);
    }

    public deleteAcVtype(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/ac/configuration/vtype/delete?vtypeNo=${params}`);
    }
}
