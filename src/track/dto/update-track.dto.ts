import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsLatitude, IsLongitude, IsISO8601 } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ApiProperty({
    description: 'Unique identifier for the device (optional)',
    example: 'vehicle-2',
    required: false,
  })
  @IsOptional()
  @IsString()
  deviceId?: string;

  @ApiProperty({
    description: 'Geographic latitude of the device position (optional)',
    example: -23.54,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsLatitude()
  latitude?: number;

  @ApiProperty({
    description: 'Geographic longitude of the device position (optional)',
    example: -46.62,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsLongitude()
  longitude?: number;

  @ApiProperty({
    description: 'ISO 8601 formatted timestamp (optional)',
    example: '2026-05-28T14:45:00Z',
    required: false,
  })
  @IsOptional()
  @IsISO8601()
  timestamp?: string;
}
