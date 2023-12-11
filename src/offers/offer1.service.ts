import { Injectable } from '@nestjs/common';
import { payload } from './constants/offer1.payload';
import { BaseOfferService } from './baseoffer.service';
import { OffersService } from './offers.service.abstract';
import { Offer } from './entities/offer.entity';
import { Offer1DTO } from './dto/offer1.dto';

@Injectable()
export class Offer1Service extends BaseOfferService implements OffersService {
  readonly providerName: string = 'offer1';

  constructor() {
    super();
  }

  private transformExternalDataToOffer(externalOfferData: Offer1DTO): Offer {
    // extract external offer data
    const {
      offer_id: externalOfferId,
      offer_name: name,
      offer_desc: description,
      call_to_action: requirements,
      offer_url: offerUrlTemplate,
      image_url: thumbnail,
      platform,
      device,
    } = externalOfferData;

    // initialize offer devices value
    let isDesktop = 0;
    let isAndroid = 0;
    let isIos = 0;

    // check what device is use
    if (platform === 'desktop') {
      isDesktop = 1;
    } else if (device == 'iphone_ipad') {
      isIos = 1;
    } else {
      isAndroid = 1;
    }

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
      externalOfferId: externalOfferId ? externalOfferId : null,
    };

    return offer;
  }

  async getOffers(): Promise<Offer[]> {
    // XXX: This chunk supposed to be the fetching of offers' data by http request, uses the const payload to not waste time for making a requests
    const {
      response: { offers: externalOffers },
    } = payload;
    const offers: Offer[] = [];

    for (const externalOfferData of Object.values(externalOffers)) {
      // validate payload
      const isValid = await this.isPayloadValid(Offer1DTO, externalOfferData);

      if (isValid) {
        // transform payload data to offer entity if valid
        offers.push(this.transformExternalDataToOffer(externalOfferData));
      }
    }

    return offers;
  }
}
