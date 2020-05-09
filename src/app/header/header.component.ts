import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isLoggedIn = false;
  email: string = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {      
      this.isLoggedIn = user ? true : false;
    });
  }

  onLogin() {
    this.router.navigate(['auth']);
  }

  onLogout() {
    this.authService.logout();
  }

  onSavedOffers(){
    this.router.navigate['saved-offers'];
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
