import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BaseDataService } from '../core/services/base-data.service';
import { acConfig } from '../app.config';

@Injectable({
    providedIn: 'root'
})
export class NavService {

    constructor(private http: HttpClient, private apiService: BaseDataService) { }
    public getMenu(_MENU_TYPE: string): any {
        let params = { menuType: _MENU_TYPE }
        return this.apiService.executeQuery<any>(`${acConfig.apiUrl}/core/common/console-menu`, params);
    }

}
