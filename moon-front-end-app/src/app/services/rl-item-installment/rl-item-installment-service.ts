import { Injectable } from "@angular/core";
import { BaseDataService } from "../base-data-service";
import { acConfig } from '../../app.config';
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})
export class RlItemInstallmentService {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }

    // save RL Item Installment
    public saveRlItemInstallment(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/rl/item/installment/add-list`, params);
    }
    public updateRlItemInstallment(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/rl/item/installment/update`, params);
    }
    public deleteRlItemInstallment(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/rl/item/installment/delete?installmentNo=${params}`);
    }
}