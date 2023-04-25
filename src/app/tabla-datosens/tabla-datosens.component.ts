import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { InvernaderoService } from '../invernadero.service';
import { User } from '../models/user.interface';
import { RoleGuardGuard } from '../role-guard.guard';
import { ip } from '../global';
import { datosensI } from '../models/datosens.interface';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabla-datosens',
  templateUrl: './tabla-datosens.component.html',
  styleUrls: ['./tabla-datosens.component.css']
})
export class TablaDatosensComponent {

  id?:number;
  datosens?: datosensI[] = [];
  sensordatos?: datosensI[] = [];
  nombre = 'olo'
  invernadero='ola'

  orden: string = 'asc';

  mostrarTabla = false;

  nombreImpreso: boolean = false;

  eventSubscription!: Subscription;
  eventSubscription1!: Subscription;

  public tieneAcceso: boolean=false;

  constructor(private companiaSvc: InvernaderoService, private router:Router, private route: ActivatedRoute, private http:HttpClient, private authService:AuthService){
  }

   ngOnInit() {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
      this.nombre = this.route.snapshot.params['sensor'];
      this.invernadero = this.route.snapshot.params['nombre'];
      console.log(this.nombre)
      console.log(this.invernadero)
      this.companiaSvc.getDatosens(ip + '/v4/mostrar/sensordatos/' + this.nombre + '/' + this.invernadero, headers).subscribe(data => {
      console.log(data)
      this.datosens = data;
    });
   this.eventSubscription1 = interval(5000).pipe(switchMap(()=> this.companiaSvc.getDatosens(ip + '/v4/mostrar/sensordatos/' + this.nombre + '/' + this.invernadero, headers))
      ).subscribe(data => {
        console.log(data)
        this. datosens= data;
      });

      this.companiaSvc.getDatosens(ip + '/v4/mostrar/sensordatos/' + this.nombre + '/' + this.invernadero, headers).subscribe(data => {
        console.log(data)
        this.sensordatos = data;
      });
     this.eventSubscription = interval(5000).pipe(switchMap(()=> this.companiaSvc.getDatosens(ip + '/v4/mostrar/sensordatos/' + this.nombre + '/' + this.invernadero, headers))
        ).subscribe(data => {
          console.log(data)
          this. sensordatos= data;
          this.ngOnDestroy();
        });
        
  }
}

ngOnDestroy() {
  this.eventSubscription.unsubscribe();
}

ngOnDestroyz() {
  this.eventSubscription1.unsubscribe();
}

buscar() {
  const authToken = this.authService.getAuthToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
  this.nombre = this.route.snapshot.params['sensor'];
  this.invernadero = this.route.snapshot.params['nombre'];
  console.log(this.nombre);
  console.log(this.invernadero);
  
  
  switch(this.orden) {
    case 'antigua':
      // Ejecutar consulta a la API para obtener los datos ordenados por fecha más antigua
      this.companiaSvc.getDatosens(ip + '/v4/fechantigua/' + this.nombre + '/' + this.invernadero, headers).subscribe(data => {
        console.log(data);
        this.sensordatos = data;
      });
  
      break;
      case 'reciente':
        // Ejecutar consulta a la API para obtener los datos ordenados por dato menor
        this.companiaSvc.getDatosens(ip + '/v4/mostrar/sensordatos/' + this.nombre + '/' + this.invernadero, headers).subscribe(data => {
          console.log(data);
          this.sensordatos = data;
        });
        break;
    case 'Dmayor':
      // Ejecutar consulta a la API para obtener los datos ordenados por dato mayor
      this.companiaSvc.getDatosens(ip + '/v4/mayormenor/' + this.nombre + '/' + this.invernadero, headers).subscribe(data => {
        console.log(data);
        this.sensordatos = data;
      });
      break;
    case 'Dmenor':
      // Ejecutar consulta a la API para obtener los datos ordenados por dato menor
      this.companiaSvc.getDatosens(ip + '/v4/menormayor/' + this.nombre + '/' + this.invernadero, headers).subscribe(data => {
        console.log(data);
        this.sensordatos = data;
      });
      break;
      default:
        this.companiaSvc.getDatosens(ip + '/v4/mostrar/sensordatos/' + this.nombre + '/' + this.invernadero, headers).subscribe(data => {
          console.log(data);
          this.sensordatos = data;
        });
        break;
  }
}
///////
}





