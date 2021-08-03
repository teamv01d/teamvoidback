import { IsBoolean, IsDate, IsEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAdvertisementDto {
 
  @IsString()
  @IsOptional()
  readonly companyID: string;

  @IsString()
  @IsOptional()
  readonly advertisement_name: string;

  @IsString()
  @IsOptional()
  readonly explanation: string;

  @IsString()
  @IsOptional()
  readonly start_date: string;

  @IsString()
  @IsOptional()
  readonly end_date: string;

  @IsString()
  @IsOptional()
  readonly city: string;

  @IsBoolean()
  @IsOptional()
  readonly advertisement_type: boolean;
}
