import { Injectable } from '@angular/core';
import { BaseDataService } from '../../services/base-data-service';
import { globalVariables } from '../../core/constants/globalVariables';
import { acConfig } from '../../app.config';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private serverPath = globalVariables.API_URL;

  constructor(private apiService: BaseDataService) { }

  // Login
  public userLogin(_USERNAME: string, _PASSWORD: string, _COMPANY_NO): any {
    let params = { userName: _USERNAME, password: _PASSWORD, companyNo: _COMPANY_NO }
    return this.apiService.executeQuery<any>(`${acConfig.apiUrl}/core/auth/login`, params);
  }
  public userCompany(_USERNAME: string): any {
    let params = { userName: _USERNAME }
    return this.apiService.executeQuery<any>(`${acConfig.apiUrl}/core/auth/companies`, params);
  }
  public getMenu(_MENU_TYPE: string): any {
    let params = { menuType: _MENU_TYPE }
    return this.apiService.executeQuery<any>(`${acConfig.apiUrl}/core/common/console-menu`, params);
  }

}