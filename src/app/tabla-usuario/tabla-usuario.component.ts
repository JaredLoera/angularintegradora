import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { InvernaderoService } from '../invernadero.service';
import { User } from '../models/user.interface';
import { User2 } from '../models/user2.interface';
import { ip } from '../global';

@Component({
  selector: 'app-tabla-usuario',
  templateUrl: './tabla-usuario.component.html',
  styleUrls: ['./tabla-usuario.component.css']
})
export class TablaUsuarioComponent {

  id?:number;

  orden: string = 'asc';

  public tipoBusqueda: string = 'nombre';
  public valorBusqueda: string = '';

  email?: string;
  
  users2?: User2[] = [];

  constructor(private companiaSvc: InvernaderoService, private authService: AuthService, private http:HttpClient, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
      const authToken = this.authService.getAuthToken();
      if (authToken) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
      this.companiaSvc.getUsersWithRoles2(ip+'/v1/consultar/usuarios', headers).subscribe(data => {
        this.users2 = data;
        console.log(data)
      });
    }
  }

  onDelete(id1:number){
    const authToken = this.authService.getAuthToken();
      if (authToken) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
        this.id = +this.route.snapshot.paramMap.get('id')!
    this.http.put(ip+'/v1/eliminar/usuario/'+id1,null, {headers}).subscribe((response)=>{
    console.log(response);
    location.reload();
  },
  (error)=>{
    console.error(error)
  });
    }
  }

  buscardos() {
  console.log(this.tipoBusqueda, this.valorBusqueda);
  const authToken = this.authService.getAuthToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
  let url = '';
  if (this.tipoBusqueda === 'nombre') {
    url = ip+'/v1/buscarname/'+this.valorBusqueda;
  } else if (this.tipoBusqueda === 'email') {
    url = ip+'/v1/buscaremail/'+this.valorBusqueda;
  }
  this.companiaSvc.getUserBusqueda(url, headers).subscribe(
    (data) => {
      this.users2 = data;
      console.log(data);
    },
    (error) => {
      console.log(error);
      // Aquí puedes mostrar un mensaje de error al usuario o hacer cualquier otra cosa que desees.
    }
  );
}

  buscar() {
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    
    switch(this.orden) {
      case 'admin':
        // Ejecutar consulta a la API para obtener los datos ordenados por fecha más antigua
        this.companiaSvc.getUsersWithRoles2(ip+'/v1/filtroadmin', headers).subscribe(data => {
          this.users2 = data;
          console.log(data)
        });
    
        break;
        case 'user':
          // Ejecutar consulta a la API para obtener los datos ordenados por dato menor
          this.companiaSvc.getUsersWithRoles2(ip+'/v1/filtrouser', headers).subscribe(data => {
            this.users2 = data;
            console.log(data)
          });
          break;
          case 'all':
            // Ejecutar consulta a la API para obtener los datos ordenados por dato menor
            this.companiaSvc.getUsersWithRoles2(ip+'/v1/consultar/usuarios', headers).subscribe(data => {
              this.users2 = data;
              console.log(data)
            });
            break;
        default:
          this.companiaSvc.getUsersWithRoles2(ip+'/v1/consultar/usuarios', headers).subscribe(data => {
            this.users2 = data;
            console.log(data)
          });
          break;
    }
  }

}
