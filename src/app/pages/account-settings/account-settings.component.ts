import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(private _ajustes: SettingsService) { }

  ngOnInit() {
    this._ajustes.iniciarCheck();
  }

  cambiarTema( tema: string, link: any) {
    const url = `assets/css/colors/${ tema }.css`;
    this._ajustes.aplicarCheck( link );
    this._ajustes.aplicarTema(tema, url);
  }

}
