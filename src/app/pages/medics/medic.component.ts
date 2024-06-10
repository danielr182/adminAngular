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
  isLoading = false;
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
  ) {}

  ngOnInit() {
    this.createForm();
    this._activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id !== 'new') {
        this.loadMedic(id);
      }
    });
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
    this._medicService.getMedicById(id).subscribe({
      next: (medic) => {
        this.medic = medic;
        this.selectedHospital = <Hospital>medic.hospital;
        this.form.setValue({
          hospital: this.selectedHospital.uid,
          name: this.medic?.name,
        });
      },
      error: (err) => {
        console.log(err.error);
        this._router.navigateByUrl('/medics');
      },
    });
  }

  updateMedic(): void {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    this.medic.name = this.form.get('name')?.value;
    this.medic.hospital = this.form.get('hospital')?.value;
    this._medicService.updateMedic(this.medic).subscribe({
      next: (medic) => {
        this.medic = <Medic>medic;
        this._router.navigate(['/medic', this.medic.uid]);
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
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
