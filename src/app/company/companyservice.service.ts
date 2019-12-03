import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Company} from './company';
import {Technology} from '../technology/technology';
import {Language} from './Language';
import {Specialize} from './Specialize';
import {Market} from './Market';
import {Relationship} from './Relationship';

const httpOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CompanyserviceService {
   logoUrlApi = 'http://localhost:8080/addLogo';
  companyUrl = 'http://localhost:8080/company/';
  private activeUrl = 'http://localhost:8080/changeActive';
  private languageUrl = 'http://localhost:8080/getAllLanguage';
  private marketUrl = 'http://localhost:8080/getAllMarket';
  private relationshipUrl = 'http://localhost:8080/getAllRelationship';
  private specializeUrl = 'http://localhost:8080/getAllSpecialize';

  getLanguage = 'http://localhost:8080/Language';
  private getRelationship = 'http://localhost:8080/Relationship';
  private getMarket = 'http://localhost:8080/Market';
  private getSpecialize = 'http://localhost:8080/Specialize';

  imgUrl = 'http://localhost:8080/mutilpartFile';

  searchByCompanyNameAndRelationshipUrl = 'http://localhost:8080/searchCompany/';

  searchByNameUrl = 'http://localhost:8080/searchCompanyByName?companyName=';
  constructor(private http: HttpClient) {
  }

  changeActive(id: number): Observable<any> {
    return this.http.put(this.activeUrl + '/' + id, httpOption).pipe(
      catchError(this.handleError)
    );
  }

  getAllCompany(): Observable<Company[]> {
    return this.http.get<Company[]>(this.companyUrl);
  }

  getAllLanguage(): Observable<Language[]> {
    return this.http.get<Language[]>(this.languageUrl);
  }

  getAllMarket(): Observable<Market[]> {
    return this.http.get<Market[]>(this.marketUrl);
  }

  getAllSpecialize(): Observable<Specialize[]> {
    return this.http.get<Specialize[]>(this.specializeUrl);
  }

  getAllRelationship(): Observable<Relationship[]> {
    return this.http.get<Relationship[]>(this.relationshipUrl);
  }

  createCompany(formdata): Observable<Company> {
    return this.http.post<Company>(this.companyUrl, formdata);
  }


  getCompanyByid(id: number): Observable<Company> {
    // debugger;
    return this.http.get<Company>(this.companyUrl + id, httpOption);
  }


  editCompany(id: number, company: Company): Observable<any> {
    return this.http.put(this.companyUrl + id, company, httpOption);
  }

  getLanguageById(id: number): Observable<Language> {
    return this.http.get<Language>(this.getLanguage + '/' + id);
  }

  getRelationshipById(id: number): Observable<Relationship> {
    return this.http.get<Relationship>(this.getRelationship + '/' + id);
  }

  getMarketById(id: number): Observable<Market> {
    return this.http.get<Market>(this.getMarket + '/' + id);
  }

  getSpecializeById(id: number): Observable<Specialize> {
    return this.http.get<Specialize>(this.getSpecialize + '/' + id);
  }

  addLogo(id: number, formdata): Observable<any> {
    return this.http.post<any>(this.logoUrlApi + '/' + id , formdata,  {reportProgress: true, observe: 'events'}).pipe(
      catchError(this.handleError)
    );
  }

  addImg(id: number, formdata): Observable<any> {
    return this.http.post<any>(this.imgUrl + '/' + id , formdata,{reportProgress: true, observe: 'events'}).pipe(
      catchError(this.handleError)
    );
  }

  searchByCompanyNameandRelationship(id: number, companyName: string): Observable<Company[]>{
    return this.http.get<Company[]>(this.searchByCompanyNameAndRelationshipUrl + id + '?companyName=' +companyName);
  }

  searchByName(companyName: string): Observable<Company[]>{
    return  this.http.get<Company[]>(this.searchByNameUrl + companyName );
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
