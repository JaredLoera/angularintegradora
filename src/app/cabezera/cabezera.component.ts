import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../models/user.interface';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { ip } from '../global';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-cabezera',
  templateUrl: './cabezera.component.html',
  styleUrls: ['./cabezera.component.css']
})
export class CabezeraComponent {

  hideInfo = false;
  //isLoggedIn: boolean = false;
  isLogin = false;
  user?:User;
  showHeader = true;

  constructor(private tokenService:TokenService , private authService: AuthService, private http:HttpClient, private router:Router, private sharedService: SharedService, private cdRef: ChangeDetectorRef,) {
    this.sharedService.refreshHeader$.subscribe(() => {
      this.refreshHeader();
    });
  }

  refreshHeader() {
    this.cdRef.detectChanges();
  }

  loggedIn(){
    if(this.tokenService.isLoggedIn()){
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
  }

  

  ngOnInit() {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
    console.log(authToken);
    this.authService.getUserByToken(authToken).subscribe(user => {
        if (user) {
          this.showHeader=true;
          this.isLogin=true;
          this.user = user;
        } else {
          this.showHeader = false;
          this.isLogin = false;
          console.error('Invalid token');
        }
      });
    } else {
      this.showHeader = true;
      console.error('Auth token is missing');
    }
  }

  logout(){
    this.cerrarSesion();
  }

  cerrarSesion(){
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.post(ip+'/v1/logout/usuario', { headers }).subscribe((response:any)=>{
      console.log(response);
      this.authService.logout();
      this.isLogin=false;
      this.router.navigateByUrl('');
    },
    (error)=>{
      console.error(error);
      location.reload(); 
    });
  }

}
