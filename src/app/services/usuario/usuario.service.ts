import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert';

import { ServiceModule } from '../service.module';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { SubirArchivoService } from './../subir-archivo/subir-archivo.service';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: ServiceModule
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[];

  constructor( public _http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivoService) {
    this.cargarLocalStorage();
   }

  estaLogueado() {
    return this.token.length > 5;
  }

  cargarLocalStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarLocalStorage(token: string, usuario: Usuario, menu: any[]) {
    localStorage.setItem('id', usuario._id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  crearUsuario( usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this._http.post( url, usuario ).pipe(
      map( (resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }),
      catchError(err => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return throwError(err);
      })
    );
  }

  logOut() {
    this.token = '';
    this.usuario = null;
    this.menu = [];
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  loginGoogle( token: string ) {
    const url = URL_SERVICIOS + '/login/google';
    return this._http.post( url, { token } ).pipe(
      map( (resp: any) => {
        this.guardarLocalStorage(resp.token, resp.usuario, resp.menu);
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
        this.guardarLocalStorage(resp.token, resp.usuario, resp.menu);
        return true;
      }),
      catchError(err => {
        swal('Error en login', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;
    return this._http.put( url, usuario).pipe(
      map( (resp: any) => {
        if (usuario._id === this.usuario._id) {
          this.guardarLocalStorage( this.token, resp.usuario, this.menu);
        }
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      }),
      catchError(err => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return throwError(err);
      })
    );
  }

  actualizarImagen( archivo: File, id: string ) {
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id)
        .then( (resp: any) => {
          this.usuario.img = resp.usuario.img;
          swal('Imagen Actualizada', this.usuario.nombre, 'success');
          this.guardarLocalStorage(this.token, resp.usuario, this.menu);
        })
        .catch(resp => {
          console.log( resp );
        });
  }

  cargarUsuarios( desde: number = 0 ) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this._http.get(url);
  }

  buscarUsuario( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this._http.get(url).pipe(
      map( (res: any) => {
        return res.usuarios;
      })
    );
  }

  eliminarUsuario( id: string ) {
    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
    return this._http.delete(url).pipe(
      map( (res: any) => {
        swal('Usuario Borrado', 'El usuario ha sido eliminado correctamente', 'success');
        return true;
      })
    );
  }

}
