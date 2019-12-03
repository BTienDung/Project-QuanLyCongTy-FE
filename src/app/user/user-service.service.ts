import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from './user';
import {catchError} from 'rxjs/operators';

const httpOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  getUserUrl = 'http://localhost:8080/getUser/';
  editUserUrl = 'http://localhost:8080/editUser/';
  editAvatarUrl = 'http://localhost:8080/editAvatar/';

  constructor(private http: HttpClient) {
  }

  getUserByName(name: string): Observable<User> {
    return this.http.get<User>(this.getUserUrl + name, httpOption).pipe(
      catchError(this.handleError)
    );
  }

  updateAvatar(formData): Observable<HttpEvent<any>> {
    return this.http.post<any>(this.editAvatarUrl, formData, {reportProgress: true, observe: 'events'}).pipe(
      catchError(this.handleError)
    );
  }

  editUser(username: string, user: User): Observable<any> {
    return this.http.put(this.editUserUrl  + username, user, httpOption).pipe(
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
