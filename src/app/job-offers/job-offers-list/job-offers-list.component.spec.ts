import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOffersListComponent } from './job-offers-list.component';

describe('JobOffersListComponent', () => {
  let component: JobOffersListComponent;
  let fixture: ComponentFixture<JobOffersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobOffersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOffersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
