import { JobOffer } from './job-offer.model';

export class ScrappeOffers {
  constructor(
    public indeed: { amount: number; time: number },
    public ejobs: { amount: number; time: number },
    public hipo: { amount: number; time: number },
    public jobOffers: JobOffer[]
  ){}
}
