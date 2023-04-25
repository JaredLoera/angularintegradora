import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const authToken = this.authService.getAuthToken();
      if (authToken) {
        return this.authService.verifyAuthToken(authToken).toPromise().then(valid => {
          if (valid) {
            return true;
          } else {
            this.router.navigate(['']);
            return false;
          }
        });
      } else {
        this.router.navigate(['']);
        return false;
      }
  }
  
}
