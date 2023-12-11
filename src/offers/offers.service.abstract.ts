import { Offer } from './entities/offer.entity';

export abstract class OffersService {
  abstract readonly providerName: string;
  abstract getOffers(): Promise<Offer[]>;
}
