import { Injectable } from '@angular/core';
import { HttpPetitions } from '@core/services/http-petitions.service';
import { Account, CreateAccountInterface } from './models/account.interface';
import { SERVER_ENDPOINTS } from '@core/const/server-endpoint.const';
import { Page } from '@pages/models/page.interface';

@Injectable({
  providedIn: 'root',
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

  async pages(): Promise<Page[]> {
    return await this.http.get<Page[]>(
      SERVER_ENDPOINTS.ACCOUNTS.PAGES.BASE_ENDPOINT
    );
  }

  async checkIfPageRegistered(pageId: string): Promise<boolean> {
    return await this.http.get<boolean>(
      SERVER_ENDPOINTS.ACCOUNTS.PAGES.BY_PAGE_ID(pageId)
    );
  }
}
