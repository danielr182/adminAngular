import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public _router: Router,
    public _activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    this._activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales().subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
    });
    this._modalUploadService.notificacion.subscribe((resp) => {
      this.medico.img = resp.medico.img;
    });
  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id).subscribe((medico) => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital ?? '');
    });
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }

    this._medicoService.guardarMedico(this.medico).subscribe((medico) => {
      this.medico = medico;
      this._router.navigate(['/medico', medico._id]);
    });
  }

  cambioHospital(hospital: string | EventTarget) {
    const id =
      typeof hospital === 'string'
        ? hospital
        : (<HTMLSelectElement>hospital).value;
    this._hospitalService
      .obtenerHospitalPorId(id)
      .subscribe((hospital) => (this.hospital = hospital));
  }

  cambioFoto() {
    if (!this.medico._id) return;
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }
}
