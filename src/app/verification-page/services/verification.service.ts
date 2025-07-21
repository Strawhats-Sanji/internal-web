import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface VerificationData {
  photo?: string;
  face_image?: string;
  centralID?: string;
  customer_id?: string;
  surname?: string;
  firstname?: string;
  first_name?: string;
  middlename?: string;
  middle_name?: string;
  birthdate?: string;
  DateOfBirth?: string;
  gender?: string;
  birthcountry?: string;
  nationality?: string;
  residence_AdressLine1?: string;
  residential_address?: string;
  residence_state?: string;
  state_of_capture?: string;
  telephoneno?: string;
  Phone_number1?: string;
  self_origin_state?: string;
  state_of_origin?: string;
}

export interface VerificationResult {
  success: boolean;
  message: string;
  data?: VerificationData;
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
    // return this.http.post<VerificationResult>(this.apiUrl, requestBody);

    // --- MOCK IMPLEMENTATION ---
    if (number && number.length === 11) {
      const mockSuccess: VerificationResult = {
        success: true,
        message: `${type.toUpperCase()} is valid. Details below:`,
        data: {
          photo: '...', // Your base64 string here
          centralID: '100129641',
          surname: 'AYENOTO',
          firstname: 'PETER',
          middlename: 'ADESHINA',
          birthdate: '30-05-1997',
          gender: 'm',
          birthcountry: 'nigeria',
          residence_AdressLine1: '20 DANIEL FAFUNMI STREET',
          residence_state: 'Lagos',
          telephoneno: '07064767691',
          self_origin_state: 'Ondo'
        }
      };
      return of(mockSuccess).pipe(delay(1500));
    } else {
      const mockError = {
        success: false,
        message: `Invalid ${type.toUpperCase()} provided. Please check the number and try again.`
      };
      return throwError(() => mockError).pipe(delay(1500));
    }
    // --- END MOCK ---
  }
} 