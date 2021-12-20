import { Injectable } from "@angular/core";
import { BaseDataService } from "../base-data-service";
import { acConfig } from '../../app.config';
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})
export class VideoService {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }

    public saveVideo(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/rl/video/add`, params);
    }
    public deleteVideo(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/rl/video/delete?videoNo=${params}`);
    }
    public updateVideo(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/rl/video/update`, params);
    }
}