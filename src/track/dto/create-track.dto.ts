import { Type } from 'class-transformer';
import {
  IsISO8601,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({
    description: 'Unique identifier for the device',
    example: 'vehicle-1',
  })
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty({
    description: 'Geographic latitude of the device position (-90 to 90)',
    example: -23.55052,
  })
  @Type(() => Number)
  @IsNumber()
  @IsLatitude()
  latitude: number;

  @ApiProperty({
    description: 'Geographic longitude of the device position (-180 to 180)',
    example: -46.633308,
  })
  @Type(() => Number)
  @IsNumber()
  @IsLongitude()
  longitude: number;

  @ApiProperty({
    description: 'ISO 8601 formatted timestamp of the position record',
    example: '2026-05-28T14:30:00Z',
  })
  @IsISO8601()
  @IsNotEmpty()
  timestamp: string;
}
