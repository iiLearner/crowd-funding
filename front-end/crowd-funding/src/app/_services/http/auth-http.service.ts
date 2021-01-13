import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_USERS_URL = `http://127.0.0.1:8000`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) { }

  // public methods
  login(username: string, password: string): Observable<any> {

    let body = new URLSearchParams();
    body.set('email', username);
    body.set('password', password);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post(`${API_USERS_URL}/api/auth/signin`, body.toString(), options);
  }

  getUserByToken(token): Observable<any> {
    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }

    return this.http.post(`${API_USERS_URL}/api/auth/user`, null, options);
  }

}
