import { Module } from '@nestjs/common';
import { Offer1Service } from './offer1.service';
import { Offer2Service } from './offer2.service';

@Module({
  exports: [Offer1Service, Offer2Service],
  providers: [Offer1Service, Offer2Service],
})
export class OffersModule {}
