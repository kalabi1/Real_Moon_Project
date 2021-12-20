import { Injectable } from '@angular/core';
import { BaseDataService } from '../base-data-service';
import { acConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class Rl1001Service {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }

    // save RL Configuration
    public saveRlConfig(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/rl/configuration/add`, params);
    }

    // save Facing Form
    public saveRlFacing(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/rl/configuration/facing/add`, params);
    }
    public saveRlFacingList(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/rl/configuration/facing/add-list`, params);
    }

    public deleteRlFacing(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/rl/configuration/facing/delete?facingNo=${params}`);
    }

    // save RL Plot Position
    public saveRlPosition(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/rl/configuration/position/add`, params);
    }
    public saveRlPositionList(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/rl/configuration/position/add-list`, params);
    }

    public deleteRlPosition(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/rl/configuration/position/delete?positionNo=${params}`);
    }

    // save Road Size
    public saveRlRoadSize(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/rl/configuration/road-size/add`, params);
    }
    public saveRlRoadSizeList(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/rl/configuration/road-size/add-list`, params);
    }

    public updateRlRoadSize(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/rl/configuration/road-size/update`, params);
    }

    public deleteRlRoadSize(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/rl/configuration/road-size/delete?sizeNo=${params}`);
    }

    // save In Uom
    public saveInUom(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/in/configuration/uom/add`, params);
    }
    public saveInUomList(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/in/configuration/uom/add-list`, params);
    }

    public updateInUom(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/in/configuration/uom/update`, params);
    }

    public deleteInUom(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/in/configuration/uom/delete?uomNo=${params}`);
    }
}
