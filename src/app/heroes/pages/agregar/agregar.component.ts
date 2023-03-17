import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img {
      width: 100%;
      border-radius: 5px;
    }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe : Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: ''
  }

  constructor (
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar : MatSnackBar,
    public dialog: MatDialog) {

  }
  ngOnInit(): void {
    if(! this.router.url.includes('editar')) {
      return
    }

    this.activatedRoute.params
    .pipe(
      switchMap( ( {id} ) => this.heroesService.getHeroeById ( id ) )
    )
    .subscribe( heroe => this.heroe = heroe );

  }

  guardarHeroe() {
    if(this.heroe.superhero.trim().length === 0) { return }
    
    if ( this.heroe.id ) {
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe( heroe => {
        console.log('Actualizando',heroe);
        this.mostrarSnackBar('Registro Actualizado');
      })
    }
    else {
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar', heroe.id]);
          this.mostrarSnackBar('Registro Creado');
        })
    }
  }

  borrarHeroe() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      height: '180px',
      data: this.heroe
    });
    dialog.afterClosed()
    .subscribe( (result) => {
      console.log(result);
        if(result) {
          this.heroesService.eliminaHeroe(this.heroe.id!)
          .subscribe( resp => {
            this.router.navigate(['/heroes']);
          });        
        }
      });

  }

  mostrarSnackBar( mensaje: string ) {
    this.snackBar.open( mensaje, 'ok!', {
      duration: 2500
    });
  }

}
