import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html'
})
export class BuscarComponent {

  termino : string = '';
  heroes : Heroe[] = [];
  heroeSeleccionado : Heroe | undefined;


  constructor( private heroesService: HeroesService ) {}

  buscando( ) {
    this.heroesService.getSugerencias( this.termino.trim() )
      .subscribe ( heroes => this.heroes = heroes);

  }

  opcionSeleccionada( event : MatAutocompleteSelectedEvent ) {
    // TODO: validar si es un string vacio
    if (!event.option.value) { 
      this.heroeSeleccionado = undefined
      return 
    }
    const heroe: Heroe = event.option.value;
    console.log( heroe );
    this.termino = heroe.superhero;
    
    this.heroesService.getHeroeById(heroe.id!)
      .subscribe( heroe => this.heroeSeleccionado = heroe );

  }

}
