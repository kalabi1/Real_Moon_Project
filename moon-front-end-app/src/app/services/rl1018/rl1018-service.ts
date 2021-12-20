import { Injectable } from "@angular/core";
import { BaseDataService } from "../base-data-service";
import { acConfig } from '../../app.config';
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})
export class Rl1018Service {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }

    public updateReadStatus(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/rl/property-contact/update/read-status`, params);
    }
    public updateUnReadStatus(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/rl/property-contact/update/unread-status`, params);
    }
}