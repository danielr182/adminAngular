import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class SettingsService {
  settings: Setting = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default',
  };

  constructor(@Inject(DOCUMENT) private _document: Document) {
    this.loadSettings();
  }

  saveSettings() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  loadSettings() {
    if (localStorage.getItem('settings')) {
      this.settings = JSON.parse(localStorage.getItem('settings') ?? '');
    }
    this.applytheme(this.settings.theme, this.settings.themeUrl);
  }

  applytheme(theme: string, url: string) {
    this._document.querySelector('#theme')?.setAttribute('href', url);
    this.settings.theme = theme;
    this.settings.themeUrl = url;
    this.saveSettings();
  }

  applyCheck(link: any) {
    const selectors: any = this._document.getElementsByClassName('selector');
    for (const ref of selectors) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  startCheck() {
    const selectors: any = this._document.getElementsByClassName('selector');
    for (const ref of selectors) {
      if (ref.getAttribute('data-theme') === this.settings.theme) {
        ref.classList.add('working');
        break;
      }
    }
  }
}

interface Setting {
  themeUrl: string;
  theme: string;
}
