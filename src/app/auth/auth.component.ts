import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SavedJobOffersService } from '../job-offers/saved-job-offers.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent{
  isLoginMode = true;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar, private savedOffersService: SavedJobOffersService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['']);
        this.savedOffersService.getSavedOffers().subscribe();
        this.showSnackBar('Successfully logged in!');
      },
      errorMessage => {
        this.showSnackBar(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  showSnackBar(message: string){
    this.snackBar.open(message, "Close", {
      duration: 3000,
    });
  }
}
