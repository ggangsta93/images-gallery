import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchImagesResponse, Image } from '../interface/images.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'AvU6SBvL1MBI6SrA0JTyszQiRWzZKHKl';
  private _historial: string[] = [];
  public resultados: Image[]=[];

  constructor(private http: HttpClient) {
    this._historial= JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados= JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  get historial() {
    return [...this._historial];
  }

  async buscarGifs(valor: string = '') {
    valor = valor.trim().toLocaleLowerCase();

    if (!this._historial.includes(valor)) {
      this._historial.unshift(valor);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial',JSON.stringify(this._historial));
    }
    //console.log(this._historial);

    /*respo es de tipo any porque typescript no tiene manera de saber 
    que respuesta va regresar ya que no es quien realiza la petición http; 
    para solucionar el tipo de dato se crea una interface */

    this.http.get<SearchImagesResponse>(`https://api.giphy.com/v1/gifs/search?api_key=AvU6SBvL1MBI6SrA0JTyszQiRWzZKHKl&q=${valor}&limit=10`)
      .subscribe((respo) => {
        console.log(respo.data);
        this.resultados=respo.data;
        localStorage.setItem('resultados',JSON.stringify(this.resultados));

      })


  }

}
