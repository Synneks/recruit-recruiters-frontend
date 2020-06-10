import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { JobOffer } from './job-offer.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { take, exhaustMap, map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SavedJobOffersService {
  savedOffersChanged = new Subject<JobOffer[]>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  getSavedOffers() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) 
          return [];
        return this.http
          .get<JobOffer[]>(
            environment.firebaseUsersUrl.concat(user.id + '.json'),
            {
              params: new HttpParams().set('auth', user.token),
            }
          )
          .pipe(
            map((jobOffers) => {
              const mappedOffers: JobOffer[] = [];
              for (const id in jobOffers) {
                mappedOffers.push(
                  new JobOffer(
                    jobOffers[id]['applicationLink'],
                    jobOffers[id]['companyImage'],
                    jobOffers[id]['companyName'],
                    jobOffers[id]['description'],
                    jobOffers[id]['jobTitle'],
                    jobOffers[id]['location'],
                    jobOffers[id]['offerLink'],
                    jobOffers[id]['site'],
                    jobOffers[id]['workType'],
                    jobOffers[id]['id']
                  )
                );
              }
              // console.log(mappedOffers);
              return mappedOffers;
            }),
            tap((jobOffers) => {
              this.savedOffersChanged.next(jobOffers.slice());
            })
          );
      })
    );
  }

  saveOffer(jobOffer: JobOffer) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.put(
          environment.firebaseUsersUrl.concat(`${user.id}/${jobOffer.id}.json`),
          jobOffer,
          {
            params: new HttpParams().set('auth', user.token),
          }
        );
      })
    );
  }

  unsaveOffer(jobOffer: JobOffer) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.delete(
          environment.firebaseUsersUrl.concat(`${user.id}/${jobOffer.id}.json`),
          {
            params: new HttpParams().set('auth', user.token),
          }
        );
      })
    );
  }
}
