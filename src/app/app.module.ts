import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/material-components.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobOffersComponent } from './job-offers/job-offers.component';
import { SearchBarComponent } from './job-offers/search-bar/search-bar.component';
import { JobOffersListComponent } from './job-offers/job-offers-list/job-offers-list.component';
import { AuthComponent } from './auth/auth.component';
import { ChartsModule } from 'ng2-charts';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    JobOffersComponent,
    SearchBarComponent,
    JobOffersListComponent,
    AuthComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
