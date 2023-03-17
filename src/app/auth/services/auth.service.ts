import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap,map } from 'rxjs/operators';

import { Auth } from '../interfaces/auth.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlApi: string = environment.urlApi;
  private _auth : Auth | undefined;

  constructor( private http: HttpClient ) { }

  get auth () {
    return { ...this._auth };
  }

  login() : Observable<Auth> {
    return this.http.get<Auth>(`${this.urlApi}/usuarios/1`)
      .pipe(
        tap( auth => this._auth = auth ),
        tap( auth => localStorage.setItem('token', auth.id ) )
      );
  }

  logout() {
    this._auth = undefined; 
    localStorage.removeItem('token');
  }

  verificaAuth() : Observable<boolean> {
    if( !localStorage.getItem( 'token' ) ) {
      return of(false);
    }
    return this.http.get<Auth>(`${this.urlApi}/usuarios/1`)
      .pipe (
        map( auth => {
          console.log(auth);
          this._auth = auth;
          return true;
        })
      );
  }


}
