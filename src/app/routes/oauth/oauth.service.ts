import { Injectable } from '@angular/core';
import { ResponseAcceptInterface } from './models/accept.interface';
import { HttpPetitions } from '@core/services/http-petitions.service';
import { SERVER_ENDPOINTS } from '@core/const/server-endpoint.const';

@Injectable({
  providedIn: 'root',
})
export class OAuthService {
  constructor(private http: HttpPetitions) {}

  async accept(id: string): Promise<ResponseAcceptInterface> {
    return await this.http.get<ResponseAcceptInterface>(
      SERVER_ENDPOINTS.PAGES.ACCEPT(id)
    );
  }
}
