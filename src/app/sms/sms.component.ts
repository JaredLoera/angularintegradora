import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InvernaderoService } from '../invernadero.service';
import { ip } from '../global';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent {

  codigo?: number;
  request_id?: number;
  Id?: number;

  constructor(private http: HttpClient, private router:Router, private companiaSvc:InvernaderoService) { }

  onInit(){
    this.Id=this.companiaSvc.getId();
    console.log(this.companiaSvc.getRequestId());
  }

  onSubmit() {
    this.Id=this.companiaSvc.getId();
    const formData = {
      codigo: this.codigo,
      //request_id: this.companiaSvc.getRequestId(),
    };
    this.http.post(ip+'/v1/verificar/usuariosms/'+this.Id, formData).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/login']);
    },
    (error)=>{
      console.error(error)
    }
    );
  }

}
