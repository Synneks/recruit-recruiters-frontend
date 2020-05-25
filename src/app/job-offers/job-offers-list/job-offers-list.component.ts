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
  jobOffers: JobOffer[] = [
    // new JobOffer(
    //   'https://ro.indeed.com/rc/clk?jk=e4c02238620f929a&from=vj&pos=bottom&sjdu=bUhgiVwp1LmavqUbZy97GDgZAsB2aArt4-cqGeMxRB4AUAHUUiRcVM7QuYaBvGaEsrIF6XN46CbLf-WvsLnHOoUjYTHjog9H7UinClKhM5Q',
    //   'https://d2q79iu7y748jz.cloudfront.net/s/_logo/698e7e84b5e27a41991012d90d222bf6', //null,
    //   'Company Name',
    //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate eros erat, a blandit tortor vehicula a. Quisque sollicitudin ante quis velit ullamcorper imperdiet. Pellentesque vel tellus sit amet nunc dignissim tincidunt. Nam consectetur magna eu ultrices finibus. Praesent finibus ligula imperdiet mauris pellentesque mollis. Donec at odio in neque facilisis maximus in et eros. Duis facilisis orci ac justo tempus bibendum. Maecenas imperdiet lacus eget sapien placerat accumsan. Pellentesque odio dolor, eleifend et pretium in, consectetur ac ex. Mauris ac dui arcu. Pellentesque convallis mauris non nisl venenatis vehicula. Praesent luctus leo quis libero viverra ultrices. Proin posuere rutrum rhoncus. Sed molestie suscipit purus. Donec nec ligula mollis, egestas quam non, egestas sapien. Vivamus tristique magna tellus, sit amet convallis dui lacinia ac. Praesent vel diam a magna cursus vestibulum. Proin condimentum auctor consequat. Maecenas porta sed tellus eu mattis. Integer nulla nisl, auctor ac nulla eget, commodo euismod magna. Morbi suscipit neque at turpis dictum volutpat. Aliquam erat volutpat. Suspendisse in porta libero. Donec at libero id neque ultricies ultrices. Sed efficitur a enim eu fringilla. Maecenas tincidunt finibus posuere. In bibendum eu tortor quis volutpat. Sed quam orci, tempus quis elit quis, accumsan auctor leo. Mauris et tempus odio. Etiam nibh arcu, vehicula id dolor sit amet, imperdiet efficitur leo.', //null,
    //   'Job Title',
    //   'Job Location',
    //   'http://ro.indeed.com/rc/clk?jk=e4c02238620f929a&fccid=c55ff6400ebb6f1c&vjs=3',
    //   'indeed',
    //   'Full-time' //null
    // ),
    // new JobOffer(
    //   'https://www.ejobs.ro/user/locuri-de-munca/embedded-pre-sales-manager/1287652',
    //   'https://img.ejobs.ro/img/logos/7/7586.jpg',
    //   'NTT Data Romania SA',
    //   null,
    //   'Safety Broker caută Junior Account Manager',
    //   'Brasov, Bucuresti, Cluj‑Napoca, Sibiu',
    //   'https://www.ejobs.ro/user/locuri-de-munca/embedded-pre-sales-manager/1287652',
    //   'ejobs',
    //   null
    // ),
  ];
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
    this.setJobOffersSubscription();
    this.setSavedOffersSubscription();
    this.setLoginSubscription();
  }

  setJobOffersSubscription() {
    this.jobOffersSubscription = this.jobOffersService.jobOffersChanged.subscribe(
      (scrapeOffers: ScrappeOffers) => {
        if (scrapeOffers) {
          this.jobOffers = scrapeOffers.jobOffers;
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
