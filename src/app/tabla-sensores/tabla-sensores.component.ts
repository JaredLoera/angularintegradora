import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { InvernaderoService } from '../invernadero.service';
import { User } from '../models/user.interface';
import { RoleGuardGuard } from '../role-guard.guard';
import { ip } from '../global';
import { sensoresI } from '../models/sensores.interface';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabla-sensores',
  templateUrl: './tabla-sensores.component.html',
  styleUrls: ['./tabla-sensores.component.css']
})
export class TablaSensoresComponent {
  sensores?: sensoresI[] = [];
  invernadero = 'ola';

  eventSubscription!: Subscription;

  public tieneAcceso: boolean=false;

  constructor(private companiaSvc: InvernaderoService, private router:Router, private route: ActivatedRoute, private http:HttpClient, private authService:AuthService){
  }

  ngOnInit() {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
      this.invernadero = this.route.snapshot.params['nombre'];
      console.log(this.invernadero)
    this.companiaSvc.getSensores(ip+'/v4/mostrar/inverdatos/'+this.invernadero, headers).subscribe(data => {
      console.log(data)
      this.sensores = data;
    });
    this.eventSubscription = interval(5000).pipe(switchMap(()=> this.companiaSvc.getSensores(ip+'/v4/mostrar/inverdatos/'+this.invernadero, headers))
      ).subscribe(data => {
        console.log(data)
        this. sensores= data;
      });
  }
}

ngOnDestroy() {
  this.eventSubscription.unsubscribe();
}


}
