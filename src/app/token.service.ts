import { forwardRef ,Inject,Injectable } from '@angular/core';
import { Observable } from '@firebase/util';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private authTokenKey = 'my-token';
  //public isLoggedIn = false;

  constructor(private cookieService: CookieService) {
    //this.isLoggedIn = !!this.getAuthToken();
  }

  logout() {
    this.cookieService.delete(this.authTokenKey);
    this.authTokenKey = 'my-token'; // actualizar el valor de authTokenKey
  }

  setAuthToken(authToken: string) {
    this.cookieService.set(this.authTokenKey, authToken);
    this.authTokenKey = 'my-token'; // actualizar el valor de authTokenKey
  }

  getAuthToken(): string | undefined {
    return this.cookieService.get(this.authTokenKey);
  }

  isLoggedIn(): boolean {
    const token = this.getAuthToken();
    return !!token; // devuelve true si el token existe, false si no
  }
}
