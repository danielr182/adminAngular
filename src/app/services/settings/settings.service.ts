import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { ServiceModule } from '../service.module';

@Injectable({
  providedIn: ServiceModule
})

export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor(@Inject( DOCUMENT ) private _document) {
    this.cargarAjustes();
   }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
    }
    this.aplicarTema(this.ajustes.tema, this.ajustes.temaUrl);
  }

  aplicarTema(tema: string, url: string) {
    this._document.getElementById('tema').setAttribute('href', url);
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }

  aplicarCheck( link: any ) {
    const selectores: any = this._document.getElementsByClassName('selector');
    for (const ref of selectores) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  iniciarCheck() {
    const selectores: any = this._document.getElementsByClassName('selector');
    for (const ref of selectores) {
      if (ref.getAttribute('data-theme') === this.ajustes.tema) {
        ref.classList.add('working');
        break;
      }
    }
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
