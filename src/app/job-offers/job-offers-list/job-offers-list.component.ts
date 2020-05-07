import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobOffer } from '../job-offer.model';
import { Subscription } from 'rxjs';
import { JobOfferService } from '../job-offers.service';

@Component({
  selector: 'app-job-offers-list',
  templateUrl: './job-offers-list.component.html',
  styleUrls: ['./job-offers-list.component.scss'],
})
export class JobOffersListComponent implements OnInit, OnDestroy {
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
    //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate eros erat, a blandit tortor vehicula a. Quisque sollicitudin ante quis velit ullamcorper imperdiet. Pellentesque vel tellus sit amet nunc dignissim tincidunt. Nam consectetur magna eu ultrices finibus. Praesent finibus ligula imperdiet mauris pellentesque mollis. Donec at odio in neque facilisis maximus in et eros. Duis facilisis orci ac justo tempus bibendum. Maecenas imperdiet lacus eget sapien placerat accumsan. Pellentesque odio dolor, eleifend et pretium in, consectetur ac ex. Mauris ac dui arcu. Pellentesque convallis mauris non nisl venenatis vehicula. Praesent luctus leo quis libero viverra ultrices. Proin posuere rutrum rhoncus. Sed molestie suscipit purus. Donec nec ligula mollis, egestas quam non, egestas sapien. Vivamus tristique magna tellus, sit amet convallis dui lacinia ac. Praesent vel diam a magna cursus vestibulum. Proin condimentum auctor consequat. Maecenas porta sed tellus eu mattis. Integer nulla nisl, auctor ac nulla eget, commodo euismod magna. Morbi suscipit neque at turpis dictum volutpat. Aliquam erat volutpat. Suspendisse in porta libero. Donec at libero id neque ultricies ultrices. Sed efficitur a enim eu fringilla. Maecenas tincidunt finibus posuere. In bibendum eu tortor quis volutpat. Sed quam orci, tempus quis elit quis, accumsan auctor leo. Mauris et tempus odio. Etiam nibh arcu, vehicula id dolor sit amet, imperdiet efficitur leo.', //null,
    //   'Safety Broker caută Junior Account Manager',
    //   'Brasov, Bucuresti, Cluj‑Napoca, Sibiu',
    //   'https://www.ejobs.ro/user/locuri-de-munca/embedded-pre-sales-manager/1287652',
    //   'ejobs',
    //   null
    // ),
    // new JobOffer(
    //   'https://www.hipo.ro/locuri-de-munca/locuri_de_munca/144320/JTI-Romania/Quality-(Management/Improvement)-INTERNSHIP',
    //   null,
    //   'JTI Romania',
    //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate eros erat, a blandit tortor vehicula a. Quisque sollicitudin ante quis velit ullamcorper imperdiet. Pellentesque vel tellus sit amet nunc dignissim tincidunt. Nam consectetur magna eu ultrices finibus. Praesent finibus ligula imperdiet mauris pellentesque mollis. Donec at odio in neque facilisis maximus in et eros. Duis facilisis orci ac justo tempus bibendum. Maecenas imperdiet lacus eget sapien placerat accumsan. Pellentesque odio dolor, eleifend et pretium in, consectetur ac ex. Mauris ac dui arcu. Pellentesque convallis mauris non nisl venenatis vehicula. Praesent luctus leo quis libero viverra ultrices. Proin posuere rutrum rhoncus. Sed molestie suscipit purus. Donec nec ligula mollis, egestas quam non, egestas sapien. Vivamus tristique magna tellus, sit amet convallis dui lacinia ac. Praesent vel diam a magna cursus vestibulum. Proin condimentum auctor consequat. Maecenas porta sed tellus eu mattis. Integer nulla nisl, auctor ac nulla eget, commodo euismod magna. Morbi suscipit neque at turpis dictum volutpat. Aliquam erat volutpat. Suspendisse in porta libero. Donec at libero id neque ultricies ultrices. Sed efficitur a enim eu fringilla. Maecenas tincidunt finibus posuere. In bibendum eu tortor quis volutpat. Sed quam orci, tempus quis elit quis, accumsan auctor leo. Mauris et tempus odio. Etiam nibh arcu, vehicula id dolor sit amet, imperdiet efficitur leo.', //null,
    //   'Quality (Management/Improvement) INTERNSHIP',
    //   'BUCURESTI, Ilfov',
    //   'https://www.hipo.ro/locuri-de-munca/locuri_de_munca/144320/JTI-Romania/Quality-(Management/Improvement)-INTERNSHIP',
    //   'hipo',
    //   'full-time'
    // ),
  ];
  currentPage: number;
  subscription: Subscription;
  location: string[] 

  constructor(private jobOfferService: JobOfferService) {}

  ngOnInit(): void {
    this.subscription = this.jobOfferService.jobOffersChanged.subscribe(
      (jobOffers: JobOffer[]) => {
        this.jobOffers = jobOffers;
      }
    );
  }

  onApply(url: string) {
    window.open(url, '_blank');
  }

  getDescription(jobOffer: JobOffer) {
    if (!jobOffer.description) {
      this.jobOfferService
        .scrapeDetails(jobOffer)
        .subscribe((detailedJobOffer) => {
          const jobOfferChangedIndex = this.jobOffers.indexOf(jobOffer);
          this.jobOffers[jobOfferChangedIndex] = detailedJobOffer;
        });
    }
  }

  setPage(){

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
