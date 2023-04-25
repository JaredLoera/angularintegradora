import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { InvernaderoService } from '../invernadero.service';
import { rol } from '../models/rol.interface';
import { ip } from '../global';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent {

  usuario = { name: '', email: '', password: '', rol_id: 1, status:1};
  id ?:number;
  status: number[] = [1, 0];
  roles: rol[] = [];

  selectedRolId: number | undefined;

  constructor(private companiaSvc: InvernaderoService, private router:Router, private route: ActivatedRoute, private http:HttpClient, private authService:AuthService){
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.companiaSvc.getUser(ip+'/v1/consultar/usuario/'+this.id).subscribe(data => {
      console.log(data);
      this.usuario = data;
    });
    this.companiaSvc.getRoles(ip+'/v1/rol').subscribe(data => {
      console.log(data);
      this.roles = data;
    });
  }

  onSubmit() {
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    this.id = +this.route.snapshot.paramMap.get('id')!;
    const formData = {
      name: this.usuario.name,
      email: this.usuario.email,
      rol_id: this.selectedRolId,
      status: this.usuario.status
    };
    this.http.put(ip+'/v1/modificar/usuario/'+this.id, formData, {headers}).subscribe((response) => {
      console.log(response);
      this.router.navigate(['tabla-user']);
    },
    (error)=>{
      console.error(error)
    }
    );
  }

}
