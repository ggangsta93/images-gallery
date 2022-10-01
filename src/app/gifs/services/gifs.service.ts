import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }
  
  buscarGifs(valor: string='') {
    valor = valor.trim().toLocaleLowerCase();
    
    if(!this._historial.includes(valor)){
      this._historial.unshift(valor);
      this._historial= this._historial.splice(0,10);
    }
    console.log(this._historial);
  }

  constructor() { }
}
