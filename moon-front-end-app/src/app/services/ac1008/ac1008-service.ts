import { Injectable } from '@angular/core';
import { BaseDataService } from '../base-data-service';
import { acConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class Ac1008Service {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }

    // Save Voucher  
    public saveAcVoucher(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/ac/voucher/add`, params);
    }
    public updateAcVoucher(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/ac/voucher/update`, params);
    }
    public deleteAcVoucher(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/ac/voucher/delete?vNo=${params}`);
    }

    // Save Voucherdtl  
    public saveAcVoucherdtl(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/ac/voucher/voucherdtl/add`, params);
    }
    public updateAcVoucherdtl(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/ac/voucher/voucherdtl/update`, params);
    }

    public saveAcVoucherdtlList(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/ac/voucher/voucherdtl/add-list`, params);
    }

    public deleteAcVoucherdtl(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/ac/voucher/voucherdtl/delete?vdtlNo=${params}`);
    }
    public deleteAcVoucherdtlList(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/ac/voucher/voucherdtl/delete-list?vNo=${params}`);
    }
}
