import { Injectable } from '@angular/core';
import { BaseDataService } from '../base-data-service';
import { acConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }
    // save Contact Form
    public saveApartment(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/rl/project/ap/add`, params);
    }
    public updateApartment(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/rl/project/ap/update`, params);
    }
    public deleteApartment(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/rl/project/ap/delete?projectNo=${params}`);
    }
}