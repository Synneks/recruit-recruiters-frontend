import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { JobOffer } from './job-offer.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JobOfferService {
  jobOffersChanged = new Subject<JobOffer[]>();

  constructor(private http: HttpClient) {}

  scrapeOffers(jobTitle: string, jobLocation: string) {
    return this.http
      .get<JobOffer[]>(`http://127.0.0.1:5000/jobs/${jobTitle}/${jobLocation}`)
      .pipe(
        map((jobOffers) => {
          return jobOffers.map((jobOffer) => {
            return {
              ...jobOffer,
              collapsed: true,
            };
          });
        }),
        tap((jobOffers) => {
          this.jobOffersChanged.next(jobOffers);
        })
      );
  }

  scrapeDetails(jobOffer: JobOffer) {
    return this.http
      .put<JobOffer>('http://127.0.0.1:5000/job/details', jobOffer)
      .pipe(
        map((detailedJobOffer: JobOffer) => {
          detailedJobOffer.collapsed = false;
          return detailedJobOffer;
        })
      );
  }
}
