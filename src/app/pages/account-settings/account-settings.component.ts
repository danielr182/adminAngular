import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(private _settingsService: SettingsService) { }

  ngOnInit() {
    this._settingsService.startCheck();
  }

  changeTheme( theme: string, link: any) {
    const url = `assets/css/colors/${ theme }.css`;
    this._settingsService.applyCheck( link );
    this._settingsService.applytheme(theme, url);
  }

}
