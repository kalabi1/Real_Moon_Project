import { Injectable } from "@angular/core";
import { BaseDataService } from "../base-data-service";
import { acConfig } from '../../app.config';
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})
export class SA1010Service {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }

    // save SA Gallery
    public saveGallery(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/sa/gallery/add`, params);
    }
    public updateGallery(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/sa/gallery/update`, params);
    }
    public deleteGallery(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/sa/gallery/delete?galleryNo=${params}`);
    }

}