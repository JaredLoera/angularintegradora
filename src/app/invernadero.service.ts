import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from './models/user.interface';
import { User2 } from './models/user2.interface';
import { rol } from './models/rol.interface';
import { inverI } from './models/inver.interface';
import { sensoresI } from './models/sensores.interface';
import { datosensI } from './models/datosens.interface';

@Injectable({
  providedIn: 'root'
})
export class InvernaderoService {

  public url: string='';
  public id: string='';
  public Id:number=0;


  constructor(private http: HttpClient) { }

  getInvernaderos(url:string, headers:HttpHeaders){
    return this.http.get<{ datos: inverI[] }>(url, {headers}).pipe(map(response => response.datos));
  }

  getInvernadero(url:string, headers:HttpHeaders){
    return this.http.get<{ data: inverI }>(url, {headers}).pipe(map(response => response.data));

  }

  getSensores(url:string, headers:HttpHeaders){
    return this.http.get<{ datos: sensoresI[] }>(url, {headers}).pipe(map(response => response.datos));
  }

  getSensor(url:string, headers:HttpHeaders){
    return this.http.get<{ data: sensoresI }>(url, {headers}).pipe(map(response => response.data));
  }

  getDatosens(url: string, headers: HttpHeaders) {
    return this.http.get<{ datos: datosensI[] }>(url, { headers }).pipe(
      map(response => response.datos)
    );
  }

  getUserBusqueda(url: string, headers: HttpHeaders) {
    return this.http.get<{ data: User2[] }>(url, { headers }).pipe(
      map(response => response.data)
    );
  }
  

  getDatosen(url:string, headers:HttpHeaders){
    return this.http.get<{ data: datosensI }>(url, {headers}).pipe(map(response => response.data));
  }





  getInvers(url:string){
    return this.http.get<{ datos: inverI[] }>(url).pipe(map(response => response.datos));
  }

  getInvers1(url:string){
    return this.http.get<{ data: inverI[] }>(url).pipe(map(response => response.data));
  }

  getInver(url:string){
    return this.http.get<{ data: inverI }>(url).pipe(map(response => response.data));
  }

  getSensos(url:string){
    return this.http.get<{ datos: sensoresI[] }>(url).pipe(map(response => response.datos));
  }

  getSensos1(url:string){
    return this.http.get<{ data: sensoresI[] }>(url).pipe(map(response => response.data));
  }

  getSenso(url:string){
    return this.http.get<{ data: sensoresI }>(url).pipe(map(response => response.data));
  }

  setUrl(url:string){
    this.url = url;
  }

  getUrl(){
    return this.url;
  }

  setId(Id:number){
    this.Id = Id;
  }

  getId(){
    return this.Id;
  }

  setRequestId(id:string){
    this.id = id;
  }

  getRequestId(){
    return this.id;
  }

  getUsersWithRoles(url:string) {
    return this.http.get< {datos: User[]} >(url).pipe(map(response => response.datos));
  }

  getUser(url:string) {
    return this.http.get< {data: User} >(url).pipe(map(response => response.data));
  }

  getUsersWithRoles2(url:string, headers:HttpHeaders) {
    return this.http.get< {data: User2[]} >(url, {headers}).pipe(map(response => response.data));
  }

  getRoles(url:string){
    return this.http.get<{ data: rol[] }>(url).pipe(map(response => response.data));
  }

}
