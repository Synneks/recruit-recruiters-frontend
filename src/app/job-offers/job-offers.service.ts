import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { JobOffer } from './job-offer.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobOfferService {
  jobOffersChanged = new Subject<JobOffer[]>();

  constructor(private http: HttpClient) {}

  newSearch(jobTitle: string, jobLocation: string): Observable<JobOffer[]> {
    let params = new HttpParams();
    if (jobTitle !== '') {
      params = params.set('title', jobTitle);
    }
    if (jobLocation !== undefined) {
      params = params.set('location', jobLocation);
    }    
    return this.scrapeOffers(params);
  }

  setPage(): Observable<JobOffer[]> {return;}

  scrapeOffers(params: HttpParams) {
    return this.http
      .get<JobOffer[]>(environment.crawlerUrl.concat('/jobs'), {
        params: params
      })
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
