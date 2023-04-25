import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ip } from '../global';


@Component({
  selector: 'app-formulario-inver',
  templateUrl: './formulario-inver.component.html',
  styleUrls: ['./formulario-inver.component.css']
})
export class FormularioInverComponent {
  nombre?: String;
  ubicacion?: String;
  usuario?: String;

  constructor(private http: HttpClient, private router:Router, private authService:AuthService) { }

  onSubmit() {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    const formData = {
      nombre: this.nombre,
      ubicacion: this.ubicacion,
      usuario: this.usuario,
    };
    this.http.post(ip+'/v4/crear/invernaderos', formData, {headers}).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/tabla-inver']);
    },
    (error)=>{
      console.error(error)
    }
    );
  }
}

}
