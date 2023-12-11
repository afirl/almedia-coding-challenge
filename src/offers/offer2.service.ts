import { Injectable } from '@nestjs/common';
import { payload } from './constants/offer2.payload';
import { BaseOfferService } from './baseoffer.service';
import { OffersService } from './offers.service.abstract';
import { Offer } from './entities/offer.entity';
import { Offer2DTO } from './dto/offer2.dto';

@Injectable()
export class Offer2Service extends BaseOfferService implements OffersService {
  readonly providerName: string = 'offer2';

  constructor() {
    super();
  }

  private transformExternalDataToOffer(externalOfferData: any): Offer {
    const { Offer: offerData, OS: operatingSystem } = externalOfferData;
    // extract external offer data
    const {
      campaign_id: externalOfferId,
      icon: thumbnail,
      name,
      tracking_url: offerUrlTemplate,
      instructions: requirements,
      description,
    } = offerData;

    // extract operating system data
    const { android, ios, web } = operatingSystem;

    // set devices value
    const isDesktop = web ? 1 : 0;
    const isAndroid = android ? 1 : 0;
    const isIos = ios ? 1 : 0;

    // assign offer attributes
    const offer: Offer = {
      name,
      description,
      requirements,
      thumbnail,
      isDesktop,
      isAndroid,
      isIos,
      offerUrlTemplate,
      providerName: this.providerName,
      externalOfferId: externalOfferId ? externalOfferId.toString() : null,
    };

    return offer;
  }

  async getOffers(): Promise<Offer[]> {
    // XXX: This chunk supposed to be the fetching of offers' data by http request, uses the const payload to not waste time for making a requests
    const { data } = payload;
    const offers: Offer[] = [];

    for (const externalOfferData of Object.values(data)) {
      // validate payload
      const isValid = await this.isPayloadValid(Offer2DTO, externalOfferData);

      if (isValid) {
        // transform payload data to offer entity if valid
        offers.push(this.transformExternalDataToOffer(externalOfferData));
      }
    }

    return offers;
  }
}
