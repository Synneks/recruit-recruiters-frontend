import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobOffersComponent } from './job-offers/job-offers.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: JobOffersComponent,
  },
  {
    path: 'saved-offers',
    canActivate: [AuthGuard],
    component: JobOffersComponent,
  },
  { path: 'auth', component: AuthComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
