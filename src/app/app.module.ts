import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { NoAutorizadoComponent } from './no-autorizado/no-autorizado.component';
import { SmsComponent } from './sms/sms.component';
import { TablaUsuarioComponent } from './tabla-usuario/tabla-usuario.component';
import { ModificarUsuarioComponent } from './modificar-usuario/modificar-usuario.component';
import { CabezeraComponent } from './cabezera/cabezera.component';
import { CorreoComponent } from './correo/correo.component';
import { TablaInverComponent } from './tabla-inver/tabla-inver.component';
import { IndexComponent } from './index/index.component';
import { TablaSensoresComponent } from './tabla-sensores/tabla-sensores.component';
import { FormularioInverComponent } from './formulario-inver/formulario-inver.component';
import { TablaDatosensComponent } from './tabla-datosens/tabla-datosens.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NoAutorizadoComponent,
    SmsComponent,
    TablaUsuarioComponent,
    ModificarUsuarioComponent,
    CabezeraComponent,
    CorreoComponent,
    TablaInverComponent,
    IndexComponent,
    TablaSensoresComponent,
    FormularioInverComponent,
    TablaDatosensComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
