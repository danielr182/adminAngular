import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.querySelector('div.preloader')?.classList.remove('show-preloader');
  }

}
