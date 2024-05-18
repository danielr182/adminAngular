import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal, { SweetAlertResult } from 'sweetalert2';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  cargando: boolean = false;
  desde: number = 0;
  totalRegistros: number = 0;
  hospitales: Hospital[] = [];

  constructor( public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarHospitales();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales( this.desde )
      .subscribe(
        (res: any) => {
          this.totalRegistros = res.total;
          this.hospitales = res.hospitales;
          this.cargando = false;
        }
    );
  }

  buscarHospital( termino: string ) {
    if ( termino.length > 0 ) {
      this.cargando = true;
      this._hospitalService.buscarHospital( termino )
        .subscribe((hospitales: Hospital[]) => {
          this.hospitales = hospitales;
          this.cargando = false;
        });
    } else {
      this.cargarHospitales();
    }
  }

  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros || desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarHospitales();
  }

  crearHospital() {
    Swal.fire({
      input: 'text',
      title: 'Nombre Nuevo Hospital',
    })
    .then((result: SweetAlertResult<string>) => {
      const nombre = result.value;
      if (nombre != null && nombre.length > 0) {
        const hospital: Hospital = new Hospital( nombre );
        this._hospitalService.crearHospital( hospital )
            .subscribe( resp => {
              this.cargarHospitales();
            });
      }
    });
  }

  guardarHospital( hospital: Hospital ) {
    this._hospitalService.actualizarHospital( hospital )
        .subscribe();
  }

  borrarHospital( hospital: Hospital ) {

    Swal.fire({
      title: 'Está seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      showCancelButton: true,
    })
    .then((result: SweetAlertResult<void>) => {
      if (result.isConfirmed) {
        this._hospitalService.borrarHospital( hospital._id ?? '' )
            .subscribe( resp => {
              this.cargarHospitales();
            });
      }
    });
  }

}
