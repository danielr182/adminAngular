import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
// import { MedicoService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { MedicoService } from '../../services/medico/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  cargando: boolean = false;
  totalRegistros: number = 0;
  medicos: Medico[] = [];

  constructor( public _medicoService: MedicoService, public _modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarMedicos();
    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarMedicos();
    });
  }

  cargarMedicos() {
    this.cargando = true;
    this._medicoService.cargarMedicos( )
      .subscribe(
        (res: any) => {
          this.totalRegistros = res.total;
          this.medicos = res.medicos;
          this.cargando = false;
        }
    );
  }

  buscarMedico( termino: string) {
    if ( termino.length > 0 ) {
      this.cargando = true;
      this._medicoService.buscarMedico( termino )
        .subscribe((medicos: Medico[]) => {
          this.medicos = medicos;
          this.cargando = false;
        });
    } else {
      this.cargarMedicos();
    }
  }

  borrarMedico( medico: Medico ) {

    Swal.fire({
      title: 'Está seguro?',
      text: 'Esta a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      showCancelButton: true
    })
    .then((willDelete) => {
      if (willDelete.isConfirmed) {
        this._medicoService.eliminarMedico( medico._id ?? '' )
            .subscribe( resp => {
              this.cargarMedicos();
            });
      }
    });
  }
}
