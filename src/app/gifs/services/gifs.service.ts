import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'AvU6SBvL1MBI6SrA0JTyszQiRWzZKHKl';
  private _historial: string[] = [];
  public resultados: any[]=[]

  constructor(private http: HttpClient) { }

  get historial() {
    return [...this._historial];
  }

  async buscarGifs(valor: string = '') {
    valor = valor.trim().toLocaleLowerCase();

    if (!this._historial.includes(valor)) {
      this._historial.unshift(valor);
      this._historial = this._historial.splice(0, 10);
    }
    //console.log(this._historial);

    /*respo es de tipo any porque typescript no tiene manera de saber 
    que respuesta va regresar ya no es quien realiza la petición http */
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=AvU6SBvL1MBI6SrA0JTyszQiRWzZKHKl&q=${valor}&limit=10`)
      .subscribe((respo: any) => {
        console.log(respo.data);
        this.resultados=respo.data;
      })


  }

}
