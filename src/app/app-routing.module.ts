import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobOffersComponent } from './job-offers/job-offers.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: JobOffersComponent,
  },
  { path: 'auth', 
    component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
