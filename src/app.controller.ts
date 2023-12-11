import { Controller, Get } from '@nestjs/common';
import { Offer1Service } from './offers/offer1.service';
import { Offer2Service } from './offers/offer2.service';
import { Offer } from './offers/entities/offer.entity';

@Controller()
export class AppController {
  constructor(
    private readonly offer1Service: Offer1Service,
    private readonly offer2Service: Offer2Service,
  ) {}

  @Get()
  async getOffers(): Promise<Offer[]> {
    const nestedOffers = await Promise.all([
      this.offer1Service.getOffers(),
      this.offer2Service.getOffers(),
    ]);

    // concat nested array of offers
    const offers = [].concat(...nestedOffers);

    return offers;
  }
}
