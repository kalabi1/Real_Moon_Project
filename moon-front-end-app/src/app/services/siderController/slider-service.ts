import { Injectable } from "@angular/core";
import { BaseDataService } from "../base-data-service";
import { acConfig } from '../../app.config';
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})
export class SliderService {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }

   
    public getAllSlider(): any {
        return this.http.get(`${acConfig.apiUrl}/rl/project/slider/`, {
            params: {
            },
            observe: 'response'
        }).toPromise();
    }

    // save Contact Form   
    public saveSlider(params): any {
        return this.apiService.imageSave<any>(`${acConfig.apiUrl}/rl/project/slider/add`, params);
    }
    public updateLandProject(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/rl/project/land/update`, params);
    }
    public deleteProjectSlider(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/rl/project/slider/delete?sliderNo=${params}`);
    }

    // save Contact Form
    // public getVideoGraphyPackage(params): any {
    //     return this.apiService.get(`${acConfig.apiUrl}/rl/api/rest/package/list`, params);
    // }

    public saveItemSlider(params): any {
        return this.apiService.imageSave<any>(`${acConfig.apiUrl}/rl/item/slider/add`, params);
    }
    public updateItemSlider(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/rl/item/slider/get-item-Slider`, params);
    }
    public deleteItemSlider(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/rl/item/slider/delete?sliderNo=${params}`);
    }


}