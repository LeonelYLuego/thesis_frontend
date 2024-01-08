import { Injectable } from '@angular/core';
import { HttpPetitions } from '@core/services/http-petitions.service';
import {
  LogInInterface,
  ResponseLogInInterface,
} from './models/log-in.interface';
import { SERVER_ENDPOINTS } from '@core/const/server-endpoint.const';
import { Account } from '@accounts/models/account.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpPetitions) {}

  async logIn(credentials: LogInInterface): Promise<ResponseLogInInterface> {
    return await this.http.post<ResponseLogInInterface>(
      SERVER_ENDPOINTS.AUTH.LOG_IN,
      credentials
    );
  }

  async logged(): Promise<Account> {
    return await this.http.get<Account>(SERVER_ENDPOINTS.AUTH.LOGGED);
  }
}
