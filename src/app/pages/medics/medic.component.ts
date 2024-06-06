import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Medic } from '../../models/medic.model';
import { Hospital } from '../../models/hospital.model';
import { MedicService, HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: [],
})
export class MedicComponent implements OnInit, OnDestroy {
  hospitals: Hospital[] = [];
  selectedHospital: Hospital = new Hospital({ name: '', uid: '' });
  medic: Medic = new Medic(this.selectedHospital, '', '', '', '');
  form!: FormGroup;
  private subscriptions: Subscription = new Subscription();

  constructor(
    public _medicService: MedicService,
    public _hospitalService: HospitalService,
    public _router: Router,
    public _activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService,
    private fb: FormBuilder
  ) {
    this._activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id !== 'new') {
        this.loadMedic(id);
      }
    });
  }

  ngOnInit() {
    this.createForm();
    this.subscriptions.add(
      this._hospitalService.loadHospitals(0, -1).subscribe((resp) => {
        this.hospitals = resp.hospitals;
      })
    );
    this.subscriptions.add(
      this._modalUploadService.notification.subscribe((resp) => {
        if (!resp.ok) {
          console.log(resp.errors);
          Swal.fire('Error', resp.message, 'error');
          return;
        }
        this.medic.img = resp.medic.img;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadMedic(id: string): void {
    this._medicService.getMedicById(id).subscribe((medic) => {
      this.medic = medic;
      this.selectedHospital = <Hospital>medic.hospital;
      this.form.setValue({
        hospital: this.selectedHospital.uid,
        name: this.medic?.name,
      });
    });
  }

  updateMedic(): void {
    if (this.form.invalid) {
      return;
    }

    this.medic.name = this.form.get('name')?.value;
    this.medic.hospital = this.form.get('hospital')?.value;
    this._medicService.updateMedic(this.medic).subscribe((medic) => {
      this.medic = <Medic>medic;
      this._router.navigate(['/medic', this.medic.uid]);
    });
  }

  changeHospital(hospitalId: string): void {
    this.selectedHospital =
      this.hospitals.find((hospital) => hospital.uid === hospitalId) || new Hospital({ name: '', uid: '' });
  }

  changePhoto(): void {
    this._modalUploadService.showModal('medics', this.medic);
  }

  private createForm(): void {
    this.form = this.fb.group({
      hospital: ['', Validators.required],
      name: ['', Validators.required],
    });
  }
}
