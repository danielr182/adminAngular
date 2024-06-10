import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progress1 = 40;
  progress2 = 60;

  constructor() { }

  ngOnInit() {
  }

}
