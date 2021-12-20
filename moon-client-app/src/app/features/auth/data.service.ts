import { Injectable } from '@angular/core';
import { BaseDataService } from '../../services/base-data-service';
import { acConfig } from '../../app.config';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private apiService: BaseDataService) { }

  // Login
  public userLogin(_USERNAME: string, _PASSWORD: string): any {
    let params = { customerId: _USERNAME, password: _PASSWORD, companyNo: 2 }
    return this.apiService.executeQuery<any>(`${acConfig.apiUrl}/rl/client/common/auth/login`, params);
  }

}