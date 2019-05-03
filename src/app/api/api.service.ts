import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'http://localhost:8080';
  constructor(private http: HttpClient) { }
 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'

    }),
    responseType: 'text' as 'json'

  }

    createSentence(words): Observable<any> {
    return this.http.post<any>(this.apiURL + '/create', JSON.stringify(words), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }



    handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }


}
