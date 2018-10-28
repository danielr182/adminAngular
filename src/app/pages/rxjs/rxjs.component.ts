import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  susbcripcion: Subscription;

  constructor() {

    this.susbcripcion = this.regresarObservable()
      .subscribe(
        (res) => console.log('subs ', res),
        (error) => console.error('error ', error),
        () => console.log('Obs completado')
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.susbcripcion.unsubscribe();
  }

  regresarObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador++;
        const salida = {
          valor: contador
        };
        observer.next(salida);
        // if (contador === 3) {
        //   observer.complete();
        // }
        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('obs con error');
        // }
      }, 1000 );
    })
    .pipe(
      map( res => res.valor),
      filter( (valor, index) => {
        return !(valor % 2 === 0);
      })
    );
  }

}
