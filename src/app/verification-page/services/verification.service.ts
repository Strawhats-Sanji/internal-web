import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface VerificationResult {
  success: boolean;
  message: string;
  data?: {
    centralId: string;
    surname: string;
    firstName: string;
    middleName: string;
    birthDate: string;
    gender: string;
    birthCountry: string;
    address: string;
    state: string;
    phone: string;
    stateOfOrigin: string;
    photo: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  private apiUrl = 'http://172.29.86.16:30796/v1/verify';

  constructor(private http: HttpClient) {}

  verify(type: 'nin' | 'bvn', number: string): Observable<VerificationResult> {
    const requestBody = { type, number };
    // MOCK API FOR DEMONSTRATION
    // Replace with actual http.post call when the API is ready
    // return this.http.post<VerificationResult>(this.apiUrl, requestBody);

    // --- MOCK IMPLEMENTATION ---
    console.log(`Mock verifying ${type.toUpperCase()}:`, number);
    if (number && number.length === 11) {
      // Simulate a successful API response
      const mockSuccess: VerificationResult = {
        success: true,
        message: `${type.toUpperCase()} is valid. Details below:`,
        data: {
          centralId: '100129641',
          surname: 'AYENOTO',
          firstName: 'PETER',
          middleName: 'ADESHINA',
          birthDate: '30-05-1997',
          gender: 'm',
          birthCountry: 'nigeria',
          address: '20 DANIEL FAFUNMI STREET',
          state: 'Lagos',
          phone: '07064767691',
          stateOfOrigin: 'Ondo',
          photo: 'https://i.pravatar.cc/150?u=peter'
        }
      };
      return of(mockSuccess).pipe(delay(1500));
    } else {
      // Simulate an error response
      const mockError = {
        success: false,
        message: `Invalid ${type.toUpperCase()} provided. Please check the number and try again.`
      };
      return throwError(() => mockError).pipe(delay(1500));
    }
    // --- END MOCK ---
  }
} 