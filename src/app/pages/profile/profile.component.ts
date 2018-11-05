import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor( public _usuarioService: UsuarioService) {
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(forma: NgForm) {
    this.usuario.nombre = forma.value.nombre;
    if (!this.usuario.google) {
      this.usuario.email = forma.value.email;
    }
    this._usuarioService.actualizarUsuario( this.usuario )
        .subscribe();
  }

  seleccionImagen( archivo: File ) {
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      this.imagenSubir = null;
      swal('Sólo Imágenes', 'El archivo seleccionado no es una imagen', 'error');
      return;
    }
    this.imagenSubir = archivo;
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  actualizarImagen() {
    this._usuarioService.actualizarImagen(this.imagenSubir, this.usuario._id);
  }
}
