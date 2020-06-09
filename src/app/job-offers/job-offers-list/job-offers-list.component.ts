import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { JobOffer } from '../job-offer.model';
import { Subscription } from 'rxjs';
import { JobOffersService } from '../job-offers.service';
import { SavedJobOffersService } from '../saved-job-offers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchParams } from '../searchParams.model';
import { ScrappeOffers } from '../scrape-offers.model';

@Component({
  selector: 'app-job-offers-list',
  templateUrl: './job-offers-list.component.html',
  styleUrls: ['./job-offers-list.component.scss'],
})
export class JobOffersListComponent implements OnInit, OnDestroy {
  trackByJobOfferOfferLink = (index, jobOffer) => jobOffer.offerLink;
  jobOffers: JobOffer[] = [];
  noOffersFound;
  savedOffers: JobOffer[] = [];
  jobOffersSubscription: Subscription;
  savedOffersSubscription: Subscription;
  isDescriptionLoading = false;
  loggedInSubscription: Subscription;
  loggedIn;
  currentPage: number;
  @Input() onSavedOffers;

  constructor(
    private jobOffersService: JobOffersService,
    private savedJobOffersService: SavedJobOffersService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.noOffersFound = false;
    this.setJobOffersSubscription();
    this.setSavedOffersSubscription();
    this.setLoginSubscription();
  }

  setJobOffersSubscription() {
    this.jobOffersSubscription = this.jobOffersService.jobOffersChanged.subscribe(
      (scrapeOffers: ScrappeOffers) => {
        if (scrapeOffers) {
          this.jobOffers = scrapeOffers.jobOffers;
          this.noOffersFound = this.jobOffers.length === 0;
        } else {
          this.jobOffers = [];
        }
      }
    );
  }

  setSavedOffersSubscription() {
    this.savedJobOffersService.getSavedOffers().subscribe();
    this.savedOffersSubscription = this.savedJobOffersService.savedOffersChanged.subscribe(
      (savedJobOffers: JobOffer[]) => {
        this.savedOffers = savedJobOffers;
      }
    );
  }

  setLoginSubscription() {
    this.loggedInSubscription = this.authService.user.subscribe((user) => {
      this.loggedIn = user;
    });
  }

  onApply(url: string) {
    window.open(url, '_blank');
  }

  getDescription(jobOffer: JobOffer) {
    if (!jobOffer.description) {
      this.isDescriptionLoading = true;
      this.jobOffersService.scrapeDetails(jobOffer).subscribe(
        (detailedJobOffer) => {
          const jobOfferChangedIndex = this.jobOffers.indexOf(jobOffer);
          this.jobOffers[jobOfferChangedIndex] = detailedJobOffer;
          this.isDescriptionLoading = false;
        },
        (errorMessage) => {
          this.showSnackBar(errorMessage);
          this.isDescriptionLoading = false;
        }
      );
    }
  }

  onLoadMore() {
    let paramsToSet = new SearchParams();
    this.activatedRoute.queryParams.subscribe((params) => {
      paramsToSet.title = params['title'];
      paramsToSet.location = params['location'];
      if (params['page']) {
        let pageNr = +params['page'] + 1;
        paramsToSet.page = pageNr.toString();
      } else {
        paramsToSet.page = '2';
      }
    });
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: paramsToSet,
    });
    this.jobOffersService.reset();
  }

  isSaved(jobOffer: JobOffer) {
    if (this.savedOffers) {
      for (let i = 0; i < this.savedOffers.length; i++) {
        if (this.savedOffers[i].offerLink === jobOffer.offerLink) {
          return true;
        }
      }
    } else {
      for (let i = 0; i < this.jobOffers.length; i++) {
        if (this.jobOffers[i].offerLink === jobOffer.offerLink) {
          return true;
        }
      }
    }
    return false;
  }

  onSaveOffer(jobOffer: JobOffer) {
    if (this.loggedIn) {
      this.savedJobOffersService.saveOffer(jobOffer).subscribe((resp) => {
        console.log(resp);
        this.savedJobOffersService.getSavedOffers().subscribe();
        this.showSnackBar('Offer saved!');
      });
    } else this.showSnackBar('Login needed!');
  }

  onUnsaveOffer(jobOffer: JobOffer) {
    this.savedJobOffersService.unsaveOffer(jobOffer).subscribe((resp) => {
      this.showSnackBar('Offer unsaved!');
      this.savedJobOffersService.getSavedOffers().subscribe();
    });
  }

  add3Dots(string: string, limit: number) {
    const dots = '...';
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }
    return string;
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  ngOnDestroy(): void {
    this.jobOffersSubscription.unsubscribe();
    this.savedOffersSubscription.unsubscribe();
  }
}
