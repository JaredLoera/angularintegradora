import { Component, HostListener } from '@angular/core';
import { TokenService } from '../token.service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { ip } from '../global';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  hideInfo = false;
  //isLoggedIn: boolean = false;
  //isLogin = false;

  constructor(private authService:AuthService, private tokenService:TokenService, private http: HttpClient, private router: Router) {
    //this.isLoggedIn = this.tokenService.isLoggedIn();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Si la posición de desplazamiento vertical es mayor que 500, oculta la sección de información
    this.hideInfo = (window.pageYOffset > 100);
  }
/*
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
          this.isLogin=true;
        } else {
          this.isLogin = false;
          console.error('Invalid token');
        }
      });
    } else {
      this.isLogin = false;
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
  }*/


}
