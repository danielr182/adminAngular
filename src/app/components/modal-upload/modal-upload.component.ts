import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir!: File | null;
  imagenTemp!: string | ArrayBuffer | null;

  constructor(public _subirArchivoService: SubirArchivoService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
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

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  subirImagen() {
    if (!this.imagenSubir) return;

    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo ?? '', this._modalUploadService.id ?? '')
          .then( resp => {
            this._modalUploadService.notificacion.emit( resp );
            this.cerrarModal();
          })
          .catch( err => {
            console.log('Error en la carga...');
          });
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

}
