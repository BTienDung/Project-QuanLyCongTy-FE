import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Technology} from './technology';
import {catchError} from 'rxjs/operators';

const httpOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TechnologyServiceService {
  apiUrl = 'http://localhost:8080/Technology';

  constructor(private http: HttpClient) {
  }

  getAllTechnology(): Observable<Technology[]> {
    return this.http.get<Technology[]>(this.apiUrl);
  }

  getTechnologyById(id: number): Observable<Technology> {
    return this.http.get <Technology>(this.apiUrl + '/' + id);
  }

  addTechnology(technology: Technology): Observable<any> {
    return this.http.post(this.apiUrl , technology);
  }

  deleteTechnology(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  editTechnology(technology: Technology): Observable<any> {
    return this.http.put(this.apiUrl + '/' + technology.id, technology, httpOption).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
