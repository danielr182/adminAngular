import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ServiceModule } from '../service.module';
import { FileUploadService } from '../file-upload/file-upload.service';
import { Medic } from '../../models/medic.model';
import { UserService } from '../user/user.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { MedicPaginationApi } from '../../models/api/pagination-api.model';
import { SearchApi } from '../../models/api/search-api.model';
import { MedicApi } from '../../models/api/medic-api.model';

@Injectable({
  providedIn: ServiceModule,
})
export class MedicService {
  medicUrl = environment.base_url + '/medic';

  constructor(
    public _http: HttpClient,
    public _fileUploadService: FileUploadService,
    public _userService: UserService
  ) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(): Object {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  loadMedics(from: number = 0): Observable<MedicPaginationApi> {
    const url = `${this.medicUrl}?from=${from}`;
    return this._http.get<MedicPaginationApi>(url, this.headers);
  }

  searchMedic(term: string): Observable<Medic[]> {
    const url = `${environment.base_url}/search/collection/medics/${term}`;
    return this._http.get<SearchApi>(url, this.headers).pipe(
      map((res) => {
        return <Medic[]>res.results;
      })
    );
  }

  getMedicById(id: string): Observable<Medic> {
    const url = `${this.medicUrl}/${id}`;
    return this._http.get<MedicApi>(url, this.headers).pipe(
      map((res) => {
        return res.medic;
      })
    );
  }

  deleteMedic(id: string): Observable<void> {
    const url = `${this.medicUrl}/${id}`;
    return this._http.delete(url, this.headers).pipe(
      map(() => {
        Swal.fire('Medic deleted', 'The medic has been deleted successfully', 'success');
      }),
      catchError((err) => {
        Swal.fire('Error', err.error.message, 'error');
        throw err;
      })
    );
  }

  updateMedic(medic: Medic): Observable<void | Medic> {
    if (medic.uid) {
      // updating
      const url = `${this.medicUrl}/${medic.uid}`;
      return this._http.put(url, medic, this.headers).pipe(
        map(() => {
          Swal.fire('Medic updated', medic.name, 'success');
        }),
        catchError((err) => {
          Swal.fire('Error', err.error.message, 'error');
          throw err;
        })
      );
    } else {
      // creating
      return this._http.post<MedicApi>(this.medicUrl, medic, this.headers).pipe(
        map((res) => {
          Swal.fire('Medic created', `The medic ${medic.name} has been created successfully`, 'success');
          return res.medic;
        }),
        catchError((err) => {
          Swal.fire('Error', err.error.message, 'error');
          throw err;
        })
      );
    }
  }
}
