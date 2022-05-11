import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Organisation } from '../classes/organisation';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

 
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private organisationUrl = '';
  constructor(private http: HttpClient) { }


  getOrganisation (): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(this.organisationUrl).pipe(
      tap(_ => console.log('fetched Actions')),
      catchError(this.handleError<Organisation[]>('getOrganisation', []))
    );
  }
  create(organisation: Organisation): Observable<any> {
    return this.http.post<Organisation>(this.organisationUrl, organisation, httpOptions).pipe(
      tap((newOrganisation: Organisation) => console.log(`added organisation w/ id=${newOrganisation.idOrganization}`)),
      catchError(this.handleError<Organisation>('create'))
    );
  }

}
