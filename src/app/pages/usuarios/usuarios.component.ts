import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = false;

  constructor( public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarUsuarios();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
      .subscribe(
        (res: any) => {
          this.totalRegistros = res.total;
          this.usuarios = res.usuarios;
          this.cargando = false;
        }
    );
  }

  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros || desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string ) {
    if ( termino.length > 0 ) {
      this.cargando = true;
      this._usuarioService.buscarUsuario( termino )
        .subscribe((usuarios: Usuario[]) => {
          this.usuarios = usuarios;
          this.cargando = false;
        });
    } else {
      this.cargarUsuarios();
    }
  }

  borrarUsuario( usuario: Usuario ) {
    if (usuario._id === this._usuarioService.usuario?._id) {
      Swal.fire('No puede borrar Usuario', 'No se puede borrar así mismo', 'error');
      return;
    }

    Swal.fire({
      title: 'Está seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
    })
    .then((willDelete: SweetAlertResult) => {
      if (willDelete.isConfirmed) {
        this._usuarioService.eliminarUsuario( usuario._id ?? '' )
            .subscribe( resp => {
              this.cargarUsuarios();
            });
      }
    });
  }

  guardarUsuario( usuario: Usuario ) {
    this._usuarioService.actualizarUsuario( usuario )
        .subscribe();
  }

}
