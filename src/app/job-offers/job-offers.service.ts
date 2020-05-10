import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { JobOffer } from './job-offer.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { SearchParams } from './searchParams.model';

@Injectable({
  providedIn: 'root',
})
export class JobOffersService {
  jobOffersChanged = new Subject<JobOffer[]>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  setPage(): Observable<JobOffer[]> {
    return;
  }

  scrapeOffers(searchParams: SearchParams) {
    let params = new HttpParams();
    if (searchParams.title) {
      params = params.set('title', searchParams.title);
    }
    if (searchParams.location) {
      params = params.set('location', searchParams.location);
    }
    if (searchParams.page) {
      params = params.set('page', searchParams.page)
    }
    console.log(params);

    return this.http
      .get<JobOffer[]>(environment.crawlerUrl.concat('/jobs'), {
        params: params,
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
      .put<JobOffer>(environment.crawlerUrl.concat('/job/details'), jobOffer)
      .pipe(
        map((detailedJobOffer: JobOffer) => {
          detailedJobOffer.collapsed = false;
          return detailedJobOffer;
        })
      );
  }

  getSavedOffers() {
    this.router.navigate(['saved-offers']);
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<JobOffer[]>(
          environment.firebaseDbUrl.concat(user.id + '.json'),
          {
            params: new HttpParams().set('auth', user.token),
          }
        );
      }),
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

  saveOffer(jobOffer: JobOffer) {
    this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.put(
          environment.firebaseDbUrl.concat(user.id + '.json'),
          jobOffer,
          {
            params: new HttpParams().set('auth', user.token),
          }
        );
      })
    );
  }

  unsaveOffer(jobOffer: JobOffer) {
    this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.delete(
          environment.firebaseDbUrl.concat(user.id + '.json'),
          {
            params: new HttpParams().set('auth', user.token),
          }
        );
      })
    );
  }
}
