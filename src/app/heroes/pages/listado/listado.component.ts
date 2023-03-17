import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
})
export class ListadoComponent implements OnInit{

  heroes : Heroe[] = [];
  hayError: boolean = false;

  constructor( private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe( heroes => this.heroes = heroes );
    /* Otra forma de hacerlo
      .subscribe( heroes => {
        this.heroes = heroes
        console.log( heroes )
      });
    */

    /* Forma correcta de hacerlo   
     .subscribe({
        next: (heroes) => {
          this.heroes = heroes;
        },
        error: (err) => {
          this.hayError = true;
          this.heroes = [];
        }
      }); 
    */
  }



}
