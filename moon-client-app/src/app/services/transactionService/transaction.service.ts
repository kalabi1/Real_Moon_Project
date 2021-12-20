import { Injectable } from "@angular/core";
import { BaseDataService } from "../base-data-service";
import { acConfig } from '../../app.config';
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    constructor(private apiService: BaseDataService, private http: HttpClient) { }


    public saveNominee(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/rl/trn/nominee/add`, params);
    }
    public saveNomineeList(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/rl/trn/nominee/add-list`, params);
    }
    public updateNominee(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/rl/trn/nominee/update`, params);
    }
    public updateNomineeList(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/rl/trn/nominee/update-list`, params);
    }
    public deleteNominee(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/rl/trn/nominee/delete?nomineeNo=${params}`);
    }
    public deleteNomineeByTrnNo(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/rl/trn/nominee/delete-by-trn?trnNo=${params}`);
    }

    // Save RL Transaction
    public saveTransaction(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/rl/trn/add`, params);
    }
    public updateTransaction(params): any {
        return this.apiService.put(`${acConfig.apiUrl}/rl/trn/update`, params);
    }
    public deleteTransaction(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/rl/trn/delete?trnNo=${params}`);
    }

    // Rl Trn Installment
    public saveInstallmentList(params): any {
        return this.apiService.save<any>(`${acConfig.apiUrl}/rl/trn/installment/add-list`, params);
    }
    public deleteInstallmentList(params): any {
        return this.apiService.delete(`${acConfig.apiUrl}/rl/trn/installment/delete-trn?trnNo=${params}`);
    }

}