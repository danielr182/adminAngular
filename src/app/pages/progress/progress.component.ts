import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progreso1 = 40;
  progreso2 = 60;

  constructor() { }

  ngOnInit() {
  }

}
