import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarSegundos(3).then( (res) => {
          console.log('Termino ', res);
        }
      ).catch( (error) => {
        console.log('Error ', error);
      });
  }

  ngOnInit() {
  }

  contarSegundos(segundos: number): Promise<string> {

    return new Promise((resolve, reject) => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador++;
        console.log(contador);
        if (contador === segundos) {
          resolve('Ok');
          // reject('eserror');
          clearInterval(intervalo);
        }
      }, segundos * 1000 );
    });
  }

}
