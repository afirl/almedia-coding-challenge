import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class Offer1DTO {
  @IsOptional()
  @IsString()
  offer_id?: string;

  @IsNotEmpty()
  @IsString()
  offer_name: string;

  @IsNotEmpty()
  @IsString()
  offer_desc: string;

  @IsNotEmpty()
  @IsString()
  call_to_action: string;

  @IsNotEmpty()
  @IsString()
  disclaimer: string;

  @IsNotEmpty()
  @IsString()
  offer_url: string;

  @IsNotEmpty()
  @IsString()
  image_url: string;

  @IsNotEmpty()
  @IsString()
  platform: string;

  @IsNotEmpty()
  @IsString()
  device: string;
}
