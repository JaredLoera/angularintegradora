import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Token } from '@angular/compiler';
import { ip } from '../global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email?:string;
  password?:string;

  userForm: FormGroup;
 
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router, private token: AuthService, private cookieService: CookieService, private authService: AuthService, private sharedService: SharedService) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.sharedService.triggerRefreshHeader();
  }

ngOnInit() {
  this.authService.logout();
}

 
onSubmit() {
  const formData = {
    email: this.userForm.value.email,
    password: this.userForm.value.password,
  };
  this.http.post(ip+'/v1/login', formData).subscribe((response: any) => {
    console.log(response);
    this.cookieService.set('my-token', response.token, {
      expires: 7,
      path: '/'
    });
    this.router.navigate(['/index/']);
    //this.sharedService.triggerReload();
  },
  (error)=>{
    console.error(error)
  }
  );

  
  
}

get isFormValid(): boolean {
  return this.userForm.valid;
}

}
