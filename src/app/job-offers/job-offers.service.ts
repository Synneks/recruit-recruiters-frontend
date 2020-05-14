import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { JobOffer } from './job-offer.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobOffersService {
  jobOffersChanged = new Subject<JobOffer[]>();

  constructor(private http: HttpClient) {}

  setPage(): Observable<JobOffer[]> {
    return;
  }

  scrapeOffers(searchParams: HttpParams) {
    this.jobOffersChanged.next([])
    console.log(searchParams);
    
    return this.http
      .get<JobOffer[]>(environment.crawlerUrl.concat('/jobs'), {
        params: searchParams,
      })
      .pipe(
        map((jobOffers) => {
          return jobOffers.map((jobOffer) => {
            return {
              ...jobOffer,
              id: this.setId(jobOffer.offerLink),
            };
          });
        }),
        tap((jobOffers) => {
          this.jobOffersChanged.next(jobOffers.slice());
        })
      );
  }

  scrapeDetails(jobOffer: JobOffer) {
    return this.http
      .put<JobOffer>(environment.crawlerUrl.concat('/job/details'), jobOffer)
      .pipe(
        map((detailedJobOffer: JobOffer) => {
          detailedJobOffer.id = this.setId(detailedJobOffer.offerLink);
          return detailedJobOffer;
        })
      );
  }

  setId(offerLink: string) {
    if (offerLink.indexOf('indeed.') > 0) {
      const index = offerLink.indexOf('jk=') + 3; // indeed.com shows the id of the job offer on url parameter called jk
      return offerLink.slice(index, index + 16); // the id has 16 characters
    }
    if (offerLink.indexOf('ejobs.') > 0) {
      const index = offerLink.lastIndexOf('/') + 1; // ejobs shows the id as the last path
      return offerLink.slice(index);
    }
    if (offerLink.indexOf('hipo.') > 0) {
      // hipo shows the id as the third path
      let croppedSequence = offerLink.slice(offerLink.indexOf('hipo.'));
      for (let i = 0; i < 3; i++) {
        croppedSequence = croppedSequence.slice(croppedSequence.indexOf('/') + 1);
      }
      return croppedSequence.slice(0, croppedSequence.indexOf('/'));
    }
  }

  reset(){
    this.jobOffersChanged.next([]);
  }
}
