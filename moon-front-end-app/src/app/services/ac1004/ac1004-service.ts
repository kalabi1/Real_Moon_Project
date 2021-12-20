import { Injectable } from '@angular/core';
import { BaseDataService } from '../base-data-service';
import { acConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class Ac1004Service {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }

    // Save Voucher Type 
    public saveAcNature(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/ac/nature/add`, params);
    }

    public saveAcNatureList(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/ac/nature/add-list`, params);
    }

    public deleteAcNature(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/ac/nature/delete?natureNo=${params}`);
    }
}
