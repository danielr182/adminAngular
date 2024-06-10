import { Component, OnDestroy, OnInit } from '@angular/core';
import { Medic } from '../../models/medic.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { MedicService } from '../../services/medic/medic.service';
import Swal from 'sweetalert2';
import { Subject, Subscription, of } from 'rxjs';
import { autocomplete } from '../../shared/utils/autocomplete';
import { Utils } from '../../shared/utils/utils';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styleUrl: './medics.component.scss',
})
export class MedicsComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  from: number = 0;
  totalRows: number = 0;
  medics: Medic[] = [];
  term$ = new Subject<string>();
  private subscriptions: Subscription = new Subscription();

  constructor(public _medicService: MedicService, public _modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.loadMedics();
    this.subscriptions.add(
      this.term$.pipe(autocomplete(300, (term: string) => of(this.searchMedic(term)))).subscribe()
    );
    this.subscriptions.add(
      this._modalUploadService.notification.subscribe(() => {
        this.loadMedics();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadMedics() {
    this.isLoading = true;
    this._medicService.loadMedics().subscribe((res) => {
      this.totalRows = res.total;
      this.medics = res.medics;
      this.isLoading = false;
    });
  }

  searchMedic(term: string) {
    if (term.length > 0) {
      this.isLoading = true;
      this._medicService.searchMedic(term).subscribe((medics: Medic[]) => {
        this.medics = medics;
        this.isLoading = false;
      });
    } else {
      this.loadMedics();
    }
  }

  deleteMedic(medic: Medic) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete the medic ' + medic.name,
      icon: 'warning',
      showCancelButton: true,
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        this._medicService.deleteMedic(medic.uid ?? '').subscribe(() => {
          this.loadMedics();
        });
      }
    });
  }

  changeFrom(value: number) {
    const from = this.from + value;
    if (from >= this.totalRows || from < 0) {
      return;
    }
    this.from += value;
    this.loadMedics();
  }

  getHospitalName(hospital: Hospital | string): string {
    return Utils.isString(hospital) ? '' : (<Hospital>hospital).name;
  }

  showModal(medic: Medic) {
    this._modalUploadService.showModal('medics', medic);
  }
}
