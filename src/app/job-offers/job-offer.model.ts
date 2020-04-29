export class JobOffer {
  constructor(
    public id: number,
    public companyName: string,
    public title: string,
    public location: string,
    public type: string,
    public requirements: string[],
    public responsabilites: string[],
    public benefits: string[],
    public applicationLink: string
  ) {}
}
