import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Action } from '../classes/action';
import { response } from 'express';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ActionService {


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

    private actionUrl = 'http://localhost:8089/ddops/action/';
    private actionUrl2 = "http://localhost:8089/ddops/action/findAll/"
    constructor(private http: HttpClient) { }



    getActionIdUser(id:number){
      return this.http.get(this.actionUrl2 + id)
    }


    add(userFrom:number , userTo : number, action: Action): Observable<any> {
      return this.http.post<Action>(this.actionUrl +'addAction/' + userFrom +'/' +userTo , action, httpOptions).pipe(
        tap((newAction: Action) => console.log(`added user w/ id=${newAction.idAction}`)),
        catchError(this.handleError<Action>('create'))
      );
    }


    payFacture(userFrom:number , factureReference : number, action: Action): Observable<any> {
      return this.http.post<Action>(this.actionUrl +'payFacture/' + userFrom +'/' +factureReference , action, httpOptions).pipe(
        tap((newAction: Action) => console.log(`added user w/ id`)),
        catchError(this.handleError<Action>('create'))
      );
    }


    sendMoney(userFrom:number , idPaiementUserTo : number, action: Action): Observable<any> {
      return this.http.post<Action>(this.actionUrl +'virement/' + userFrom +'/' +idPaiementUserTo , action, httpOptions).pipe(
        tap((newAction: Action) => console.log(`added user w/ `)),
        catchError(this.handleError<Action>('create'))
      );
    }
   
   
   

  
 
}
