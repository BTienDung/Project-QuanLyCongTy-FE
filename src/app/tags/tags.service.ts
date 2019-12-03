import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Tags} from './Tags';
import {catchError} from 'rxjs/operators';
import {Technology} from '../technology/technology';


const httpOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  apiUrl = 'http://localhost:8080/tag';
  constructor(private http: HttpClient) { }

  getAllTags(): Observable<Tags[]>{
  return   this.http.get<Tags[]>(this.apiUrl);
  }


  addTags(tag: Tags): Observable<any>{
   return  this.http.post(this.apiUrl, tag)
  }



  getTagById(id: number): Observable<Tags> {
    return this.http.get <Tags>(this.apiUrl + '/' + id);
  }


  editTags(tag: Tags): Observable<any> {
    debugger;
    return this.http.put(this.apiUrl + '/' + tag.id, tag, httpOption).pipe(
      catchError(this.handleError)
    );
  }

  deleteTag(id: number): Observable<any>{
    return this.http.delete(this.apiUrl + '/' + id);
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
