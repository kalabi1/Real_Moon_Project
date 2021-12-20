import { Injectable } from '@angular/core';
import { BaseDataService } from '../base-data-service';
import { acConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class Ac1006Service {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }

    // ACC Chart
    public getAccTreeList(): any {
        return this.apiService.executeQuery<any>(`${acConfig.apiUrl}/ac/chart/acc-tree-list`);
    }

    public saveAcChart(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/ac/chart/add`, params);
    }

    public updateAcChart(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/ac/chart/update`, params);
    }

    public deleteAcChart(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/ac/chart/delete?accNo =${params}`);
    }
}
