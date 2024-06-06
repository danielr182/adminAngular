import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Medic } from '../../models/medic.model';
import { Hospital } from '../../models/hospital.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  usuarios: User[] = [];
  medicos: Medic[] = [];
  hospitales: Hospital[] = [];

  constructor(public _activatedRoute: ActivatedRoute, public _http: HttpClient, public _router: Router) {
    _activatedRoute.params.subscribe( params => {
      const termino = params['termino'];
      this.buscar(termino);
    });
  }

  ngOnInit() {
  }

  buscar(termino: string) {
    const url = environment.base_url + '/busqueda/todo/' + termino;
    this._http.get(url).subscribe( (resp: any) => {
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    });
  }
}
