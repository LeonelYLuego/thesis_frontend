import { Injectable } from '@angular/core';
import { HttpPetitions } from '@core/services/http-petitions.service';
import { Account, CreateAccountInterface } from './models/account.interface';
import { SERVER_ENDPOINTS } from '@core/const/server-endpoint.const';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  constructor(private http: HttpPetitions) {}

  async create(
    createAccountInterface: CreateAccountInterface
  ): Promise<Account> {
    return await this.http.post<Account>(
      SERVER_ENDPOINTS.ACCOUNTS.BASE_ENDPOINT,
      createAccountInterface
    );
  }
}
