import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DataHTTPService } from './http/data-http.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = [];
  private authLocalStorageToken = `token`;



  constructor(
    private dataHTTPService: DataHTTPService,
    private router: Router
  ) {

  }


  // public methods
  getrequests(): Observable<any> {

    const token = this.getAuthFromLocalStorage()
    return this.dataHTTPService.requestlist(token).pipe(
      map((data) => {
        return data;
      }),
      catchError((err) => {
        console.error('err', err);
        return err;
      })
    );
  }


  get_userrequests(): Observable<any> {

    const token = this.getAuthFromLocalStorage()
    return this.dataHTTPService.user_requestlist(token).pipe(
      map((data) => {
        return data;
      }),
      catchError((err) => {
        console.error('err', err);
        return err;
      })
    );
  }


  getstatistics(): Observable<any> {

    const token = this.getAuthFromLocalStorage()
    return this.dataHTTPService.statistics(token).pipe(
      map((data) => {
        return data;
      }),
      catchError((err) => {
        console.error('err', err);
        return err;
      })
    );
  }


  get_userstatistics(): Observable<any> {

    const token = this.getAuthFromLocalStorage()
    return this.dataHTTPService.user_statistics(token).pipe(
      map((data) => {
        return data;
      }),
      catchError((err) => {
        console.error('err', err);
        return err;
      })
    );
  }



  // private methods
  private getAuthFromLocalStorage(): String {
    try {
      const authData = localStorage.getItem(this.authLocalStorageToken)
      return authData;

    } catch (error) {
      console.error(error);
      return undefined;
    }
  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
