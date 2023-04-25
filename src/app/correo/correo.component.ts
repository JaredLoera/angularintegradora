import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { InvernaderoService } from '../invernadero.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.css']
})
export class CorreoComponent {

  constructor(private userService: UserService, private formBuilder: FormBuilder,private http: HttpClient, private companiaSvc:InvernaderoService, private router:Router){}

  url?:string;


  ngOnInit() 
  {
    this.url=this.companiaSvc.getUrl();
    console.log(this.url);
  }

  subir(){
    this.url=this.companiaSvc.getUrl();
    this.http.post(this.url, null).subscribe((response: any) => {
      const url = response.url;
      console.log(response.data.request_id);
      console.log(response.id)
      this.companiaSvc.setRequestId(response.data.request_id)
      this.companiaSvc.setUrl(url);
      console.log(url);
      this.router.navigate(['sms']);
    },
    (error)=>{
      console.error(error)
    }
    );
  }

}
