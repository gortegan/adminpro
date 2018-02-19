import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable()
    .subscribe(
      numero => console.log( 'Subs', numero ),
      error => console.error( 'Error en el obs (dos veces)', error ),
      () => console.log( 'El observador termino' )
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  regresaObservable():Observable<any> {
    return new Observable( observer => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;

        let salida = {
          valor : contador
        };
        observer.next(salida);

        // if (contador === 3){
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   observer.error('Auxilio');
        // }


      }, 500);

    })
    .retry(2)
    //La respuesta es cualquier cosa que el observador este enviando en el observer.next()
    .map( (resp: any) => {
      return resp.valor;
    })
    .filter( (valor, index) => {
      return (valor % 2) === 1;
    });
  }

}
