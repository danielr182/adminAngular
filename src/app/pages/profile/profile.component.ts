import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario | null;
  imagenSubir!: File | null;
  imagenTemp!: string;

  constructor( public _usuarioService: UsuarioService) {
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(forma: NgForm) {
    if (!this.usuario) return;
    this.usuario.nombre = forma.value.nombre;
    if (!this.usuario.google) {
      this.usuario.email = forma.value.email;
    }
    this._usuarioService.actualizarUsuario( this.usuario )
        .subscribe();
  }

  seleccionImagen( event: EventTarget | null ) {
    if (!event) return;
    const archivo = (<HTMLInputElement>event).files?.[0];
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      this.imagenSubir = null;
      Swal.fire('Sólo Imágenes', 'El archivo seleccionado no es una imagen', 'error');
      return;
    }
    this.imagenSubir = archivo;
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = <string>reader.result;
  }

  actualizarImagen() {
    if (!this.imagenSubir) return;
    this._usuarioService.actualizarImagen(this.imagenSubir, this.usuario?._id ?? '');
  }
}
