import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SavedJobOffersService } from '../job-offers/saved-job-offers.service';
import { JobOffersService } from '../job-offers/job-offers.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isLoggedIn = false;
  email: string = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private savedJobOffersService: SavedJobOffersService,
    private jobOffersService: JobOffersService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isLoggedIn = user ? true : false;
    });
    this.authService.loggedOut.subscribe((bool) => {
      if (bool) this.showSnackBar('Automatically logged out due to inactivity');
    });
  }

  onLogin() {
    this.router.navigate(['auth']);
  }

  onLogout() {
    this.authService.logout();
    this.showSnackBar('Logged out');
  }

  onSavedOffers() {
    this.router.navigate(['saved-offers']);
    this.savedJobOffersService.getSavedOffers().subscribe(
      () => {},
      (errorMessage) => {
        console.log(errorMessage);
        //implement snack bar
      }
    );
  }

  onHome() {
    this.router.navigate(['']);
    // this.jobOffersService.reset();
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
