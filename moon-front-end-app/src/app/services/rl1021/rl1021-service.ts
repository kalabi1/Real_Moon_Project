import { Injectable } from "@angular/core";
import { BaseDataService } from "../base-data-service";
import { acConfig } from '../../app.config';
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})
export class RL1021Service {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }

    // save SA Gallery
    public saveCollection(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/rl/trn/collection/add`, params);
    }
    public updateCollection(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/rl/trn/collection/update`, params);
    }
    public deleteCollection(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/rl/trn/collection/delete?collNo=${params}`);
    }

}