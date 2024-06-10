import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: []
})
export class IncreaserComponent implements OnInit {
  @ViewChild('inputProg') elemHTML!: ElementRef;

  @Input() legend = 'Legend';
  @Input() progress = 50;

  @Output() changeProgress: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange (newValue: number) {

    if (newValue > 100) {
      this.progress = 100;
    } else if (newValue < 1) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }
    this.elemHTML.nativeElement.value = this.progress;
    this.changeProgress.emit( this.progress );
  }

  changePercentage( value: number ) {
    if (this.progress + value > 100 || this.progress + value < 0) {
      return;
    }
    this.progress += value;
    this.changeProgress.emit(this.progress);
    this.elemHTML.nativeElement.focus();
  }

}
