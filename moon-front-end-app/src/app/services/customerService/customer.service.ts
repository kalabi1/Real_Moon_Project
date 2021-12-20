import { Injectable } from "@angular/core";
import { BaseDataService } from "../base-data-service";
import { acConfig } from '../../app.config';
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }

    public saveCustomer(params): any {
        return this.apiService.imageSave<any>(`${acConfig.apiUrl}/rl/customer/add`, params);
    }
    public updateCustomer(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/rl/customer/update`, params);
    }
    public deleteCustomer(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/rl/customer/delete?customerNo=${params}`);
    }



}