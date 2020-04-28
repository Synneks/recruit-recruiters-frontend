import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobOffersComponent } from './job-offers.component';
import { RouterModule } from '@angular/router';
import { JobOffersRoutingModule } from './job-offers-routing.module';

@NgModule({
  declarations: [JobOffersComponent],
  imports: [CommonModule, RouterModule, JobOffersRoutingModule],
  exports: [],
})
export class JobOffersModule {}
