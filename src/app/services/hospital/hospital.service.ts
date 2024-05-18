import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ServiceModule } from '../service.module';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: ServiceModule
})
export class HospitalService {

  token!: string;

  constructor( public _http: HttpClient, public _subirArchivoService: SubirArchivoService ) {
    this.cargarLocalStorage();
  }

  cargarLocalStorage() {
    this.token = localStorage.getItem('token') ?? '';
  }

  cargarHospitales( desde: number = 0 ) {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this._http.get(url);
  }

  buscarHospital( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this._http.get(url).pipe(
      map( (res: any) => {
        return res.hospitales;
      })
    );
  }

  obtenerHospitalPorId( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this._http.get(url).pipe(
      map( (res: any) => {
        return res.hospital;
      })
    );
  }

  crearHospital( hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital?token=' + this.token;
    return this._http.post(url, hospital).pipe(
      map( (res: any) => {
        Swal.fire('Hospital Creado', 'El hospital ha sido creado correctamente', 'success');
        return true;
      })
    );
  }

  actualizarHospital(hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this.token;
    return this._http.put( url, hospital).pipe(
      map( (resp: any) => {
        Swal.fire('Hospital actualizado', hospital.nombre, 'success');
        return true;
      })
    );
  }

  borrarHospital( id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this.token;
    return this._http.delete(url).pipe(
      map( (res: any) => {
        Swal.fire('Hospital Borrado', 'El hospital ha sido eliminado correctamente', 'success');
        return true;
      })
    );
  }
}
