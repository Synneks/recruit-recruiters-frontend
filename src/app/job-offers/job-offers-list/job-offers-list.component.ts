import { Component, OnInit } from '@angular/core';
import { JobOffer } from '../job-offer.model';

@Component({
  selector: 'app-job-offers-list',
  templateUrl: './job-offers-list.component.html',
  styleUrls: ['./job-offers-list.component.scss'],
})
export class JobOffersListComponent implements OnInit {
  jobOffers: JobOffer[] = [
    new JobOffer(
      1,
      'Ntt Data',
      'Java Developer',
      'Cluj-Napoca',
      'Full-Time',
      ['Bachelor Thesis in Computer Science', 'Java', 'SQL Databases'],
      ['Maintenance of small projects', 'Delegations every 2 months'],
      ['Small salary', 'Built-in restaurant at the office', 'Games room'],
      'mylink.com'
    ),
    new JobOffer(
      2,
      'Endava',
      'Angular Developer',
      'Bucharest',
      'Part-Time',
      [
        'Bachelor Thesis in Computer Science',
        'Angular',
        'Firebase',
        'HTML',
        'CSS',
      ],
      ['Web design'],
      ['No salary at all', 'Lakes nearby'],
      'myotherlink.com'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onApply(url: string) {
    let newUrl = window.decodeURIComponent(url);
    newUrl = newUrl.trim().replace(/\s/g, '');
    if (/^(:\/\/)/.test(newUrl)) {
      newUrl = `http${newUrl}`;
    } else if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
      newUrl = `http://${newUrl}`;
    }
    window.open(newUrl, '_blank');
  }
}
