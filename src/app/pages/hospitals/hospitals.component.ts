import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Subject, Subscription, of } from 'rxjs';
import { autocomplete } from '../../shared/utils/autocomplete';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrl: './hospitals.component.scss',
})
export class HospitalsComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  from: number = 0;
  totalRows: number = 0;
  hospitals: Hospital[] = [];
  term$ = new Subject<string>();
  private subscriptions: Subscription = new Subscription();

  constructor(public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.loadHospitals();
    this.subscriptions.add(
      this.term$.pipe(autocomplete(300, (term: string) => of(this.searchHospital(term)))).subscribe()
    );
    this.subscriptions.add(
      this._modalUploadService.notification.subscribe(() => {
        this.loadHospitals();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  showModal(hospital: Hospital) {
    this._modalUploadService.showModal('hospitals', hospital);
  }

  loadHospitals() {
    this.isLoading = true;
    this._hospitalService.loadHospitals(this.from).subscribe((res) => {
      this.totalRows = res.total;
      this.hospitals = res.hospitals;
      this.isLoading = false;
    });
  }

  searchHospital(term: string) {
    if (term.length > 0) {
      this.isLoading = true;
      this._hospitalService.searchHospital(term).subscribe((hospitales: Hospital[]) => {
        this.hospitals = hospitales;
        this.isLoading = false;
      });
    } else {
      this.loadHospitals();
    }
  }

  changeFrom(value: number) {
    const from = this.from + value;
    if (from >= this.totalRows || from < 0) {
      return;
    }
    this.from += value;
    this.loadHospitals();
  }

  createHospital() {
    Swal.fire({
      input: 'text',
      title: 'Name New Hospital',
    }).then((result: SweetAlertResult<string>) => {
      const name = result.value;
      if (name) {
        const hospital: Hospital = new Hospital({ name, uid: '' });
        this._hospitalService.createHospital(hospital).subscribe(() => {
          this.loadHospitals();
        });
      }
    });
  }

  updateHospital(hospital: Hospital) {
    this._hospitalService.updateHospital(hospital).subscribe();
  }

  deleteHospital(hospital: Hospital) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete the hospital ' + hospital.name,
      icon: 'warning',
      showCancelButton: true,
    }).then((result: SweetAlertResult<void>) => {
      if (result.isConfirmed) {
        this._hospitalService.deleteHospital(hospital.uid ?? '').subscribe(() => {
          this.loadHospitals();
        });
      }
    });
  }
}
