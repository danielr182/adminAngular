import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { FileUploadService } from '../file-upload/file-upload.service';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HospitalApi } from '../../models/api/hospital-api.model';
import { SearchApi } from '../../models/api/search-api.model';
import { HospitalPaginationApi } from '../../models/api/pagination-api.model';

@Injectable()
export class HospitalService {
  hospitalUrl = environment.base_url + '/hospital';

  constructor(public _http: HttpClient, public _fileUploadService: FileUploadService) {}

  loadHospitals(from: number = 0, limit: number = 0): Observable<HospitalPaginationApi> {
    const url = `${this.hospitalUrl}?from=${from}&limit=${limit}`;
    return this._http.get<HospitalPaginationApi>(url).pipe(
      map((res) => {
        res.hospitals = res.hospitals.map((hospital) => new Hospital(hospital));
        return res;
      })
    );
  }

  searchHospital(term: string): Observable<Hospital[]> {
    const url = `${environment.base_url}/search/collection/hospitals/${term}`;
    return this._http.get<SearchApi>(url).pipe(
      map((res) => {
        return res.results.map((hospital) => new Hospital(<Hospital>hospital));
      })
    );
  }

  getHospitalById(id: string): Observable<Hospital> {
    const url = `${this.hospitalUrl}/${id}`;
    return this._http.get<HospitalApi>(url).pipe(
      map((res) => {
        return res.hospital;
      })
    );
  }

  createHospital(hospital: Hospital): Observable<Hospital> {
    const url = `${this.hospitalUrl}`;
    return this._http.post<HospitalApi>(url, hospital).pipe(
      map((res) => {
        Swal.fire('Hospital created', `The hospital ${hospital.name} has been created successfully`, 'success');
        return res.hospital;
      })
    );
  }

  updateHospital(hospital: Hospital): Observable<void> {
    const url = `${this.hospitalUrl}/${hospital.uid}`;
    return this._http.put(url, hospital).pipe(
      map(() => {
        Swal.fire('Hospital updated', hospital.name, 'success');
      }),
      catchError((err) => {
        Swal.fire('Error', err.error.message, 'error');
        throw err;
      })
    );
  }

  deleteHospital(id: string): Observable<void> {
    const url = `${this.hospitalUrl}/${id}`;
    return this._http.delete(url).pipe(
      map(() => {
        Swal.fire('Hospital deleted', 'The hospital has been deleted successfully', 'success');
      }),
      catchError((err) => {
        Swal.fire('Error', err.error.message, 'error');
        throw err;
      })
    );
  }
}
