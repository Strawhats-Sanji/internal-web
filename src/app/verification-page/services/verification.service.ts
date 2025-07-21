import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Interface for the user data part of the API response
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
  date_of_birth?: string;
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

// Interface for the simplified structure the component uses
export interface VerificationResult {
  success: boolean;
  message: string;
  data?: VerificationData;
}

// Interface for the raw, complex API response
interface RawApiResponse {
  success: boolean;
  data: [
    { data: VerificationData },
    { message: string }
  ];
}

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  private apiUrl = 'https://intranet.summitbankng.com/v1/validate';

  constructor(private http: HttpClient) {}

  verify(type: 'nin' | 'bvn', number: string): Observable<VerificationResult> {
    const requestBody = { type, number };

    return this.http.post<RawApiResponse>(this.apiUrl, requestBody).pipe(
      map(response => {
        // Transform the complex API response into the simple structure our component needs
        return {
          success: response.success,
          message: response.data[1].message,
          data: response.data[0].data
        };
      }),
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