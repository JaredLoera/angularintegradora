import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { InvernaderoService } from '../invernadero.service';
import { inverI } from '../models/inver.interface';
import { User } from '../models/user.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { ip } from '../global';



@Component({
  selector: 'app-tabla-inver',
  templateUrl: './tabla-inver.component.html',
  styleUrls: ['./tabla-inver.component.css']
})
export class TablaInverComponent {
  
  id?:number;
  invernaderos?: inverI[] = [];
  
  currentUser?:User;
  user?:User;

  private apiUrl = 'http://localhost:3333/data-stream';
  private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  

  public tieneAcceso: boolean=false;


  constructor(private companiaSvc: InvernaderoService, private router:Router, private route: ActivatedRoute, private http: HttpClient, private authService: AuthService){
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    const authToken = this.authService.getAuthToken();

    if (authToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    this.companiaSvc.getInvernaderos(ip+'/v4/mostrar/invernaderos', headers).subscribe(data => {
      this.invernaderos = data;
    });

    console.log(authToken);

    this.read()
    const stream = new EventSource(ip+'/v4/mostrar/invernaderosSES');
    stream.addEventListener('message', (event)=>{
      if(event.data){
        this.read()
      }
      else{
        console.log("error")
      }
    })

    this.authService.getUserByToken(authToken).subscribe(user => {
      if (user) {
        this.user = user;
        console.log(`User name: ${this.user.name}`);
        console.log(`User email: ${this.user.email}`);
        console.log(`User role ID: ${this.user.rol_id}`);
        this.tieneAcceso = (user.rol_id === 1);
      } else {
        console.error('Invalid token');
      }
    });
  } else {
    console.error('Auth token is missing');
  }
  }

  read(): void{
    this.companiaSvc.getInvers(ip+'/v4/mostrar/invernaderos').subscribe(invernaderoI => this.invernaderos = invernaderoI);
  }

  OnDelete(id1:number){
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    this.id = +this.route.snapshot.paramMap.get('id')!
    this.http.put(ip+'/v4/eliminar/invernadero/'+id1,null, {headers}).subscribe((response)=>{
    console.log(response);
    location.reload();
  },
  (error)=>{
    console.error(error)
  });
  }
}


}
