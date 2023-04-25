import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvernaderoService } from '../invernadero.service';
import { rutaI } from '../models/ruta.interface';
import { User } from '../models/user.interface';
import { UserService } from '../user.service';
import { ip } from '../global';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {


  name?:String
  email?:String
  password?:String
  emailExists?: boolean;
  Id?:number; 
 
   userForm: FormGroup;
 
 
   constructor(private userService: UserService, private formBuilder: FormBuilder,private http: HttpClient, private companiaSvc:InvernaderoService, private router:Router) {
     this.userForm = this.formBuilder.group({
       name: ['', [Validators.required, Validators.minLength(3)]],
       email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required, Validators.minLength(8)]]
     });
   }
 
   checkEmailExists() {
     this.http.post<any>(ip+'/v1/usuario/correoexiste', { email: this.email }).subscribe(
       response => {
         this.emailExists = response.exists;
       }
     );
   }
   
 
   ngOnInit() 
   {
     this.userForm = this.formBuilder.group({
       name: ['', [Validators.required, Validators.minLength(3)]],
       email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required, Validators.minLength(8)]]
     });
   }
 
   get isFormValid(): boolean {
     return this.userForm.valid;
   }
 
   onSubmit() {
     if (this.isFormValid) 
     {
       const user: User = {
         name: this.userForm.value.name,
         email: this.userForm.value.email,
         password: this.userForm.value.password,
         rol_id:2,
         status:0,
       };
       this.http.post(ip+'/v1/crear/usuario', user).subscribe((response: any) => {
         console.log(response.url);
         console.log(response.data);
         console.log(response.data.id);
         this.companiaSvc.setId(response.data.id);
         const url = response.url;
         this.companiaSvc.setUrl(ip+url);
         console.log(url);
         this.router.navigate(['/correo']);
       },
       (error)=>{
         console.error(error)
       }
       );
     }
 }




}
