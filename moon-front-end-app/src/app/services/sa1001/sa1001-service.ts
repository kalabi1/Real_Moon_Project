import { Injectable } from "@angular/core";
import { BaseDataService } from "../base-data-service";
import { acConfig } from '../../app.config';
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})
export class SA1001Service {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }

    // save RL Item Installment
    public saveCompany(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/sa/company/add`, params);
    }
    public updateCompany(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/sa/company/update`, params);
    }
    public deleteCompany(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/sa/company/delete?companyNo=${params}`);
    }
}