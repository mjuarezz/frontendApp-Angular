import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate,CanLoad {
  
  constructor ( private authService : AuthService,
                private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // return this.validaAcceso();
      return this.authService.verificaAuth()
        .pipe (
          tap( estaAutenticado => {
            if( !estaAutenticado ) {
              this.router.navigate(['./auth/login']);
            }
          })
        );
  }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean  {
      // return this.validaAcceso();

      return this.authService.verificaAuth()
      .pipe (
        tap( estaAutenticado => {
          if( !estaAutenticado ) {
            this.router.navigate(['./auth/login']);
          }
        })
      );

  }

  validaAcceso() : boolean {
    if( this.authService.auth.id)  {
      console.log('canLoad',true);
      return true;
    }
    else {
      console.log('Bloqueado por el canLoad de AuthGuard',false);
      return false;
    }
  }

}
