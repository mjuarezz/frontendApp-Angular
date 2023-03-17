import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {



  constructor( private router: Router,
              private authService : AuthService ) {

  }

  login() {
    // Ir al backend
    // Un usuario
    // IR a ruta de especifica
    this.authService.login()
      .subscribe( auth => {
        if(auth.id) {
          this.router.navigate(['./heroes'])
        }
      })

  }

}
