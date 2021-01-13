import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_USERS_URL = `http://127.0.0.1:8000`;

@Injectable({
  providedIn: 'root',
})
export class DataHTTPService {
  constructor(private http: HttpClient) { }

  // public methods
  requestlist(token): Observable<any> {
    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };
    return this.http.post(`${API_USERS_URL}/api/fund/fundlist`, null, options);
  }

  user_requestlist(token): Observable<any> {
    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };
    return this.http.post(`${API_USERS_URL}/api/fund/myrequests`, null, options);
  }

  statistics(token): Observable<any> {
    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };
    return this.http.post(`${API_USERS_URL}/api/fund/mydetails`, null, options);
  }

  user_statistics(token): Observable<any> {
    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };

    return this.http.post(`${API_USERS_URL}/api/fund/mydetails`, null, options);
  }

  getUserByToken(token): Observable<any> {
    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }

    return this.http.post(`${API_USERS_URL}/api/auth/user`, null, options);
  }

}
