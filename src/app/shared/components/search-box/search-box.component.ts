import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string> //* debouncer para que la busqueda se haga cuando se deja de escribir en vez de hacer enter.

  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter;

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter;

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(500)
      )
      .subscribe( value => {
        this.onDebounce.emit(value)
    })
    }

    ngOnDestroy(): void {
      /* console.log('instancia de componente destruido') */
      this.debouncerSuscription?.unsubscribe();
    }


    emitValue(value: string): void{
  this.onValue.emit(value)
  }

  onKeyPress(searchTerm: string){
    this.debouncer.next(searchTerm)
  }

}

//* Para limpiar(cancelar) las suscripciones, se utiliza el OnDestroy. Es para que no este esperando eventos emitidos de un componente (o instancia del componente) que es destruido. En este caso el debounce esta suscripto a eventos que emita el buscador. Por ej cuando cambiamos de busqeuda por capital a busqueda por pais, se destruye el componente del buscador y se crea otro. Por lo que no es necesario que el debouncer este suscrito esperando eventos. Ayuda a mantener la memoria.
