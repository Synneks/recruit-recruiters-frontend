import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JobOfferService } from '../job-offers.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  constructor(private jobOfferService: JobOfferService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.jobOfferService
      .scrapeOffers(form.value['job-title'], form.value['location'])
      .subscribe();
  }
}
