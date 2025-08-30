import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SecretPayload {
  content: string;
  email: string;
}

export interface SecretResponse {
  responseCode?: string;
  responseMessage?: string;
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class SecretsService {
  private readonly baseUrl = environment.adService.baseUrl;

  constructor(private http: HttpClient) {}

  async sendSecret(payload: SecretPayload): Promise<SecretResponse> {
    const url = `${this.baseUrl}/secrets`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const obs$ = this.http.post<SecretResponse>(url, payload, { headers });
    return await firstValueFrom(obs$);
  }
}




