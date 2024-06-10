import { Component, OnInit } from '@angular/core';
import { SettingsService, UserService } from '../services/service.index';

declare function init_plugins(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor(private _userService: UserService ,private _settingsService: SettingsService) { }

  ngOnInit() {
    init_plugins();
    this._userService.menu
  }

}
