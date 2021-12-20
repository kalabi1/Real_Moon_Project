import { Injectable } from "@angular/core";
import { BaseDataService } from "../base-data-service";
import { acConfig } from '../../app.config';
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})
export class SA1011Service {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }

    // save SA Gallery
    public saveMessage(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/sa/message/add`, params);
    }
    public updateMessage(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/sa/message/update`, params);
    }
    public deleteMessage(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/sa/message/delete?messageNo=${params}`);
    }

}