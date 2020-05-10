import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobOffersService } from './job-offers.service';
import { SearchParams } from './searchParams.model';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.scss'],
})
export class JobOffersComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private jobOffersService: JobOffersService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const title = params['title'];
      const location = params['location'];
      const page = params['page'];
      if (title || location || page)
        this.jobOffersService
          .scrapeOffers(new SearchParams(title, location, page))
          .subscribe();
    });
  }
}
