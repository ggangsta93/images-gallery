import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  buscarGifs(valor: string) {
    this._historial.unshift(valor);
    console.log(this._historial);
  }
  
  constructor() { }
}
