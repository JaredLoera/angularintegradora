import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { InvernaderoService } from './invernadero.service';
import { User } from './models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(private authService: AuthService,
    private user: InvernaderoService,
    private router: Router) { }

}
