import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Heroe } from '../interfaces/heroes.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private urlApi : string = environment.urlApi;

  constructor( private http : HttpClient ) { }

  getHeroes() : Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.urlApi}/heroes`);
  }

  getHeroeById( heroeId: string ) : Observable<Heroe> {
    return this.http.get<Heroe>(`${this.urlApi}/heroes/${heroeId}`);
  }

  getSugerencias( termino : string ) : Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.urlApi}/heroes?q=${termino}&_limit=6`);
  }

  agregarHeroe(heroe: Heroe) : Observable<Heroe> {
    return this.http.post<Heroe>(`${this.urlApi}/heroes/`,heroe);
  }

  actualizarHeroe( heroe: Heroe ) : Observable<Heroe> {
    return this.http.put<Heroe>(`${this.urlApi}/heroes/${heroe.id}`,heroe);
  }

  eliminaHeroe( heroeId: string ) : Observable<any> {
    return this.http.delete<any>(`${this.urlApi}/heroes/${heroeId}`);
  }


}
