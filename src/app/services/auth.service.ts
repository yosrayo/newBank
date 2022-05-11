import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private UsersUrl = "http://localhost:8089/ddops/user/login";
  private router: Router;
  constructor(public http: HttpClient) { }
  public errorMessage = '';
  authenticated = false;


  authenticate(credentials, callback) {

    const headers = new HttpHeaders(credentials ? {
        authorization : 'Basic ' + btoa(credentials.mail + ':' + credentials.pwd)
    } : {});

    this.http.get(this.UsersUrl , {headers: headers})
    .subscribe((response) => {
        let data: any ;
        data = response;
        const u = data.principal;
        if (response['fullName']) {
            this.authenticated = true;
        } else {
            this.authenticated = false;
        }
        return callback && callback(data);
    });

}
  public logIn(user: any) {
    console.log(user);
    let headers = new HttpHeaders();
    headers.set('Accept', 'application/json');
    // creating base64 encoded String from user name and password
    const base64Credential: string = btoa( user.mail + ':' + user.pwd);
    headers.set( 'Authorization', 'Basic ' + base64Credential);
    console.log(headers);
    // const options = new RequestOptions();
    localStorage.setItem('currentUser', JSON.stringify(user));
    return this.http.get(this.UsersUrl, {headers: headers});

  }

  
  createAccount(user: User) {
    return this.http.post(this.UsersUrl, user);
  }

  logOut() {
    // remove user from local storage to log user out
    return this.http.post(this.UsersUrl , {})
     .subscribe((response) => {
      console.log('Response_logout : ' + response);
      let u = localStorage.getItem('currentUser');
   console.log(u);
      localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
   },
     error => {

    });

  }
  login(identifiants) {
    return this.http.post(this.UsersUrl, identifiants); // Template SUB_ROUTING
  }
  logout() {
    localStorage.removeItem('my_token');
  }

  estConnecte() {
    let token = localStorage.getItem('my_token');
    return !!token;
  }
}
