import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpPetitions {
  constructor(private readonly http: HttpClient) {}

  private getHeaders(): { [header: string]: string | string[] } | undefined {
    const token = localStorage.getItem('token');
    if (token)
      return {
        Authorization: `Bearer ${token}`,
      };
    return undefined;
  }

  async get<T>(url: string, params?: HttpParams): Promise<T> {
    return await new Promise<T>((resolve, reject) => {
      this.http
        .get<T>(url, {
          headers: this.getHeaders(),
          params,
        })
        .subscribe({
          next: (result) => resolve(result),
          error: (err) => reject(err),
        });
    });
  }

  async post<T>(url: string, body: any, params?: HttpParams): Promise<T> {
    return await new Promise<T>((resolve, reject) => {
      this.http
        .post<T>(url, body, {
          headers: this.getHeaders(),
          params,
        })
        .subscribe({
          next: (result) => resolve(result),
          error: (err) => reject(err),
        });
    });
  }

  async delete<T>(url: string, params?: HttpParams): Promise<T> {
    return await new Promise<T>((resolve, reject) => {
      this.http
        .delete<T>(url, {
          headers: this.getHeaders(),
          params,
        })
        .subscribe({
          next: (result) => resolve(result),
          error: (err) => reject(err),
        });
    });
  }
}
