import { Component, OnInit } from '@angular/core';
import { JobOffersService } from './job-offers.service';
import { SearchParams } from './searchParams.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.scss'],
})
export class JobOffersComponent implements OnInit {
  isLoading = false;

  constructor(
    private jobOffersService: JobOffersService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initiateSearchAfterParams();
  }

  initiateSearchAfterParams() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['title'] || params['location'] || params['page']) {
        let paramsToSearch = new HttpParams();
        if (params['title'] && params['title'] !== 'any') {
          paramsToSearch = paramsToSearch.set('title', params['title']);
        }
        if (params['location'] && params['location'] !== 'any') {
          paramsToSearch = paramsToSearch.set('location', params['location']);
        }
        if (params['page']) {
          paramsToSearch = paramsToSearch.set('page', params['page']);
        }
        this.isLoading = true;
        this.jobOffersService.scrapeOffers(paramsToSearch).subscribe(
          () => {
            this.isLoading = false;
          },
          (errorMessage) => {
            this.isLoading = false;
            this.showSnackBar(errorMessage);
          }
        );
      }
    });
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
