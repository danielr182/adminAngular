import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('inputProg') elemHTML!: ElementRef;

  @Input() leyenda = 'Leyenda';
  @Input() progreso = 50;

  @Output() cambioProgreso: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  enCambio (nuevoValor: number) {

    if (nuevoValor > 100) {
      this.progreso = 100;
    } else if (nuevoValor < 1) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    this.elemHTML.nativeElement.value = this.progreso;
    this.cambioProgreso.emit( this.progreso );
  }

  cambiarPorcentaje( valor: number ) {
    if (this.progreso + valor > 100 || this.progreso + valor < 0) {
      return;
    }
    this.progreso += valor;
    this.cambioProgreso.emit(this.progreso);
    this.elemHTML.nativeElement.focus();
  }

}
