import { Type } from 'class-transformer';
import {
  IsOptional,
  IsNumber,
  IsNotEmpty,
  IsString,
  IsBoolean,
  ValidateNested,
} from 'class-validator';

class OfferDTO {
  @IsOptional()
  @IsNumber()
  campaign_id?: number;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  tracking_url: string;

  @IsNotEmpty()
  @IsString()
  instructions: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

class OsDTO {
  @IsNotEmpty()
  @IsBoolean()
  android: boolean;

  @IsNotEmpty()
  @IsBoolean()
  ios: boolean;

  @IsNotEmpty()
  @IsBoolean()
  web: boolean;
}

export class Offer2DTO {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => OfferDTO)
  Offer: OfferDTO;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => OsDTO)
  OS: OsDTO;
}
