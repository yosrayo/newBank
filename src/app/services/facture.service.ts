import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Facture } from '../classes/facture';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class FactureService {


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

  private factureUrl = 'http://localhost:8089/ddops/facture';
  constructor(private http: HttpClient) { }


  getFacture (): Observable<Facture[]> {
    return this.http.get<Facture[]>(this.factureUrl).pipe(
      tap(_ => console.log('fetched Actions')),
      catchError(this.handleError<Facture[]>('getActions', []))
    );
  }
  create(facture: Facture): Observable<any> {
    return this.http.post<Facture>(this.factureUrl, facture, httpOptions).pipe(
      tap((newAction: Facture) => console.log(`added user w/ id=${newAction.idFacture}`)),
      catchError(this.handleError<Facture>('create'))
    );
  }

}
