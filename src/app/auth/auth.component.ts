import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent{
  isLoginMode = true;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {}

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
      },
      errorMessage => {
        this.showErrorSnackBar(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  showErrorSnackBar(message: string){
    this._snackBar.open(message, "Close", {
      duration: 3000,
    });
  }
}
