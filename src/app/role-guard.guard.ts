import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  
  user?: User;
  constructor(
    private authService: AuthService,
    private router: Router,

  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const authToken = this.authService.getAuthToken();
    if(authToken) {
    return this.authService.getUserByToken(authToken).pipe(
      map(user => {
        if (user && user.rol_id === 1) {
          console.log(`User name: ${user.name}`);
          console.log(`User email: ${user.email}`);
          console.log(`User role ID: ${user.rol_id}`);
          return true;
        } else {
          console.error('Invalid token or user role');
          this.router.navigate(['/unauthorized']);
          return false;
        }
      })
    );
  } 
  return of(false);
}
  
}
