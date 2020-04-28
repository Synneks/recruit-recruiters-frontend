import { Routes, RouterModule } from '@angular/router';
import { JobOffersComponent } from './job-offers.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: JobOffersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobOffersRoutingModule {}
