import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
  private apiUrl = 'http://172.29.86.16:30796/v1/validate';

  constructor(private http: HttpClient) {}

  verify(type: 'nin' | 'bvn', number: string): Observable<VerificationResult> {
    const requestBody = { type, number };
    
    // Using the live API endpoint
    return this.http.post<VerificationResult>(this.apiUrl, requestBody).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred. Please try again later.';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `A network error occurred: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Server error: ${error.status}. ${error.error?.message || 'Please try again.'}`;
    }
    return throwError(() => ({ success: false, message: errorMessage }));
  }
} 