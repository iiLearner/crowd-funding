import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { AuthHTTPService } from './http/auth-http.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = [];
  private authLocalStorageToken = `token`;

  // public fields
  currentUser$: Observable<any>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<any>;
  isLoadingSubject: BehaviorSubject<boolean>;


  get currentUserValue(): String {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: String) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<any>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }


  // public methods
  login(email: string, password: string): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.login(email, password).pipe(
      map((data) => {
        if(data["status"] == 202){
          this.setAuthFromLocalStorage(data["access_token"])
          this.currentUserSubject = new BehaviorSubject<any>(data["user"])
        }
        return data;
      }),
      catchError((err) => {
        console.error('err', err);
        return err;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/login'], {
      queryParams: {},
    });
  }




  // private methods
  private setAuthFromLocalStorage(token): boolean {
    if (token) {
      localStorage.setItem(this.authLocalStorageToken, token);
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): String {
    try {
      const authData = localStorage.getItem(this.authLocalStorageToken)
      return authData;

    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  getUserByToken(): Observable<any> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth).pipe(
      map((data) => {
        if(data["status"] == "202"){
          this.currentUserSubject = new BehaviorSubject<any>(data["user"]);
        } else {
          this.logout();
        }
        return data;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
