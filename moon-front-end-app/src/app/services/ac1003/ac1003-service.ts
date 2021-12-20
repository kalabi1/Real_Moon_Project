import { Injectable } from '@angular/core';
import { BaseDataService } from '../base-data-service';
import { acConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class Ac1003Service {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }

    // Save Voucher Type 
    public saveAcPeriod(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/ac/period/add`, params);
    }

    public saveAcPeriodList(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/ac/period/add-list`, params);
    }

    public deleteAcPeriod(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/ac/period/delete?vtypeNo=${params}`);
    }
}
