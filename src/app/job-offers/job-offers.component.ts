import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobOffersService } from './job-offers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { SavedJobOffersService } from './saved-job-offers.service';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.scss'],
})
export class JobOffersComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;
  savedOffersPathSubscription: Subscription;
  onSavedOffers = null;
  isLoading = false;

  constructor(
    private jobOffersService: JobOffersService,
    private savedJobOffersService: SavedJobOffersService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initiateSearchAfterParams();
    this.setSavedOffersRouteSubscription();
  }

  private initiateSearchAfterParams() {
    this.paramsSubscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
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
      }
    );
  }

  setSavedOffersRouteSubscription() {
    this.savedOffersPathSubscription = this.activatedRoute.url.subscribe(
      (urlSegment) => {
        if (urlSegment.length > 0 && urlSegment[0].path === 'saved-offers') {
          this.isLoading = true;
          this.onSavedOffers = true;
          this.savedJobOffersService.getSavedOffers().subscribe(() => {
            this.isLoading = false;
          },
          (errorMessage) => {
            this.isLoading = false;
            this.showSnackBar(errorMessage);
          })
        } else {
          this.onSavedOffers = false;
        }
      }
    );
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
