import { ClassConstructor, plainToInstance } from 'class-transformer';
import { Offer1DTO } from './dto/offer1.dto';
import { Offer2DTO } from './dto/offer2.dto';
import { validate } from 'class-validator';

export class BaseOfferService {
  protected async isPayloadValid(
    dtoClass: ClassConstructor<Offer1DTO | Offer2DTO>,
    payload: object,
  ): Promise<boolean> {
    // assign offer dto
    const offerDTO = plainToInstance(dtoClass, payload);

    // validate offers
    const errors = await validate(offerDTO);

    if (errors.length > 0) {
      // print warning for error
      console.warn('Payload Validation Errors: ', errors);

      // return false to skip the invalid payload
      return false;
    }

    // return true if no error
    return true;
  }
}
