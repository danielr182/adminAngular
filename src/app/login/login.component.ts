import { UsuarioService } from '../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;
  auth2: any;

  constructor(private _router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    this.recuerdame = this.email.length > 1;
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '621790932068-fsviqi6ag99b3n6d0r9ehf8p5v4rilbn.apps.googleusercontent.com',
        cookiepolicy: 'single_host_ofigin',
        scope: 'profile email'
      });
      this.attachSignIn( document.getElementById('btnGoogle'));
    });
  }

  attachSignIn( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle( token )
          .subscribe(res => window.location.href = '#/dashboard');
    });
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    const usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );

    this._usuarioService.login(usuario, forma.value.recuerdame)
        .subscribe(res => this._router.navigate(['/dashboard']));
  }

}
