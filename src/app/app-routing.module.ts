import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SmsComponent } from './sms/sms.component';
import { CorreoComponent } from './correo/correo.component';
import { NoAutorizadoComponent } from './no-autorizado/no-autorizado.component';
import { RegistroComponent } from './registro/registro.component';
import { TablaUsuarioComponent } from './tabla-usuario/tabla-usuario.component';
import { ModificarUsuarioComponent } from './modificar-usuario/modificar-usuario.component';

import { GuardAuthGuard } from './guard-auth.guard';
import { StatusGuardGuard } from './status-guard.guard';
import { RoleGuardGuard } from './role-guard.guard';
import { IndexComponent } from './index/index.component';
import { TablaInverComponent } from './tabla-inver/tabla-inver.component';
import { TablaSensoresComponent } from './tabla-sensores/tabla-sensores.component';
import { FormularioInverComponent } from './formulario-inver/formulario-inver.component';
import { TablaDatosensComponent } from './tabla-datosens/tabla-datosens.component';

const routes: Routes = [
  {path:  '',component:IndexComponent},
  {path:  'index',component:IndexComponent},
  { path: 'login', component: LoginComponent },
  { path: 'registro-user', component: RegistroComponent },
  { path: 'tabla-user', component: TablaUsuarioComponent , canActivate: [GuardAuthGuard, StatusGuardGuard, RoleGuardGuard] },
  
  { path: 'tabla-user/:email', component: TablaUsuarioComponent , canActivate: [GuardAuthGuard, StatusGuardGuard, RoleGuardGuard] },
  { path: 'modificar-user/:id', component: ModificarUsuarioComponent, canActivate: [GuardAuthGuard, StatusGuardGuard, RoleGuardGuard]},
  { path: 'tabla-inver',component: TablaInverComponent, canActivate: [GuardAuthGuard, StatusGuardGuard]},
  { path: 'formulario-inver',component: FormularioInverComponent, canActivate: [GuardAuthGuard, StatusGuardGuard]},
  { path: 'tabla-sensores/:nombre',component: TablaSensoresComponent, canActivate: [GuardAuthGuard, StatusGuardGuard]},
  { path: 'tabla-sensor',component: TablaSensoresComponent, canActivate: [GuardAuthGuard, StatusGuardGuard]},
  {path: 'tabla-datosens/:sensor/:nombre',component: TablaDatosensComponent, canActivate: [GuardAuthGuard, StatusGuardGuard]},
  


  { path: 'correo', component: CorreoComponent },
  { path: 'unauthorized', component:NoAutorizadoComponent },
  { path: 'sms', component: SmsComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
