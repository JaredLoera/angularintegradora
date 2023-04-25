import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { map } from 'rxjs';
import { User } from './models/user.interface';
import { ip } from './global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = ip;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public currentUser$: Observable<User>;
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>({
    name: '',
    email: '',
    password: '',
    rol_id: 0,
    status: 1,
  });

  constructor(private http: HttpClient, private tokenService: TokenService) { 
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  logout() {
    this.tokenService.logout();
  }

  getAuthToken() {
    return this.tokenService.getAuthToken();
  }

  setIsAuthenticated(isAuthenticated: boolean) {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  getIsAuthenticated() {
    return this.isAuthenticatedSubject.asObservable();
  }

  verifyAuthToken(authToken: string) {
    if (authToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
      return this.http.get(`${this.apiUrl}/v1/user`, { headers }).pipe(
        map(response => {
          this.isAuthenticatedSubject.next(true);
          return true;
        }),
        catchError(error => {
          this.isAuthenticatedSubject.next(false);
          return of(false);
        })
      );
    } else {
      this.isAuthenticatedSubject.next(false);
      return of(false);
    }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public getCurrentUser(): Observable<User> {
    return this.currentUser$.pipe(
      filter(user => !!user)
    );
  }

  getUserByToken(authToken: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.get<{ data: User }>(`${this.apiUrl}/v1/usuario`, { headers }).pipe(
      map(response => response.data),
      catchError(error => {
        console.error(error);
        return of({
          name: '',
          email: '',
          password: '',
          rol_id: 1,
          status: 0,
        });
      }) 
    );
  }



  
}
