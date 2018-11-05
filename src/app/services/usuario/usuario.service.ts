import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert';

import { ServiceModule } from '../service.module';
import { map } from 'rxjs/operators';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: ServiceModule
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public _http: HttpClient, public router: Router) {
    this.cargarLocalStorage();
   }

  estaLogueado() {
    return this.token.length > 5;
  }

  cargarLocalStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarLocalStorage(token: string, usuario: Usuario) {
    localStorage.setItem('id', usuario._id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  crearUsuario( usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this._http.post( url, usuario ).pipe(
      map( (resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }
    ));
  }

  logOut() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  loginGoogle( token: string ) {
    const url = URL_SERVICIOS + '/login/google';
    return this._http.post( url, { token } ).pipe(
      map( (resp: any) => {
        this.guardarLocalStorage(resp.token, resp.usuario);
        return true;
      })
    );
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + '/login';
    return this._http.post( url, usuario ).pipe(
      map( (resp: any) => {
        this.guardarLocalStorage(resp.token, resp.usuario);
        return true;
      })
    );
  }

}
