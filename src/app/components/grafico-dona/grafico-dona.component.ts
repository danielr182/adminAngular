import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() data: string;
  @Input() labels: string;
  @Input() chartType: string;
  @Input() leyenda: string;

  constructor() { }

  ngOnInit() {
  }

}
