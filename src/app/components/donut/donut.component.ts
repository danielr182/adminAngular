import { Component, OnInit, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [],
})
export class DonutComponent implements OnInit {
  @Input() charConfig!: ChartConfiguration;
  @Input() legend?: string;

  constructor() {}

  ngOnInit() {}
}
