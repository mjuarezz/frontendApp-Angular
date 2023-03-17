import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
    img {
      width: 100%;
      border-radious: 5px;
    }
    `
  ]
})
export class HeroeComponent implements OnInit {
  heroe! : Heroe;
  
  constructor ( private activatedRoute: ActivatedRoute,
                private heroesService: HeroesService,
                private router: Router ) {}
  /*
  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( ({ id }) => {
        console.log( id );

        this.heroesService.getHeroeById( id )
          .subscribe( heroe => {
            console.log( heroe );
            this.heroe = heroe;
          });
      })
  }
  */

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( (  { id } ) => this.heroesService.getHeroeById( id ) ),
        tap(console.log)
      )
      .subscribe( heroe => this.heroe = heroe);
  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }

}
