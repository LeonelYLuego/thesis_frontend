import { Injectable } from '@angular/core';
import { HttpPetitions } from '@core/services/http-petitions.service';
import { CreatePageInterface, Page } from './models/page.interface';
import { SERVER_ENDPOINTS } from '@core/const/server-endpoint.const';

@Injectable({
  providedIn: 'root',
})
export class PagesService {
  constructor(private http: HttpPetitions) {}

  async create(createPageInterface: CreatePageInterface): Promise<Page> {
    return await this.http.post<Page>(
      SERVER_ENDPOINTS.PAGES.BASE_ENDPOINT,
      createPageInterface
    );
  }

  async find(): Promise<Page> {
    return await this.http.get<Page>(SERVER_ENDPOINTS.PAGES.BASE_ENDPOINT);
  }

  async findOneByPublicKey(publicKey: string): Promise<Page> {
    return await this.http.get<Page>(
      SERVER_ENDPOINTS.PAGES.BY_PUBLIC_KEY(publicKey)
    );
  }

  async remove(): Promise<void> {
    return await this.http.delete<void>(SERVER_ENDPOINTS.PAGES.BASE_ENDPOINT);
  }
}
