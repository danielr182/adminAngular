import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceModule } from '../service.module';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { URL_SERVICIOS } from '../../config/config';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Injectable({
  providedIn: ServiceModule
})
export class MedicoService {

  constructor( public _http: HttpClient, public _subirArchivoService: SubirArchivoService, public _usuarioService: UsuarioService ) { }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico';
    return this._http.get(url);
  }

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this._http.get(url).pipe(
      map( (res: any) => {
        return res.medico;
      })
    );
  }

  buscarMedico( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this._http.get(url).pipe(
      map( (res: any) => {
        return res.medicos;
      })
    );
  }

  obtenerMedicoPorId( id: string ) {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this._http.get(url).pipe(
      map( (res: any) => {
        return res.medico;
      })
    );
  }

  eliminarMedico( id: string ) {
    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;
    return this._http.delete(url).pipe(
      map( (res: any) => {
        swal('Médico Borrado', 'El médico ha sido eliminado correctamente', 'success');
        return true;
      })
    );
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';
    if (medico._id) {
      // actualizando
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;
      return this._http.put(url, medico).pipe(
        map( (res: any) => {
          swal('Médico Actualizado', medico.nombre , 'success');
          return res.medico;
        })
      );
    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this._http.post(url, medico).pipe(
        map( (res: any) => {
          swal('Médico Creado', medico.nombre , 'success');
          return res.medico;
        })
      );
    }
  }

}
