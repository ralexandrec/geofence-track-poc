import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new track position',
    description:
      'Registers a new device position and automatically evaluates geofence alert status. If the position falls within the restricted zone (radius 500m from -23.55052, -46.633308), an alert is triggered.',
  })
  @ApiResponse({
    status: 201,
    description: 'Track created successfully with alert status',
    schema: {
      example: {
        id: 1,
        deviceId: 'vehicle-1',
        latitude: -23.55052,
        longitude: -46.633308,
        timestamp: '2026-05-28T14:30:00.000Z',
        alert: true,
        message: 'Geofence alert triggered',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request body or validation error',
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve all track positions',
    description: 'Returns a list of all stored device positions with their current alert status.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all tracks retrieved successfully',
    schema: {
      example: [
        {
          id: 1,
          deviceId: 'vehicle-1',
          latitude: -23.55052,
          longitude: -46.633308,
          timestamp: '2026-05-28T14:30:00.000Z',
          alert: true,
        },
      ],
    },
  })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a specific track by ID',
    description: 'Gets a single track position record by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'The track position ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Track retrieved successfully',
    schema: {
      example: {
        id: 1,
        deviceId: 'vehicle-1',
        latitude: -23.55052,
        longitude: -46.633308,
        timestamp: '2026-05-28T14:30:00.000Z',
        alert: true,
      },
    },
  })
  findOne(@Param('id') id: string, @Res() res?: any) {
    const result = this.trackService.findOne(+id);
    if (res) {
      if (result === null) {
        return res.status(200).json(null);
      }
      return res.status(200).json(result);
    }
    return result;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a track position',
    description:
      'Updates an existing track position with new coordinates or timestamp. The geofence alert status is recalculated based on the new position.',
  })
  @ApiParam({
    name: 'id',
    description: 'The track position ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Track updated successfully with new alert status',
    schema: {
      example: {
        id: 1,
        deviceId: 'vehicle-1',
        latitude: -23.54,
        longitude: -46.62,
        timestamp: '2026-05-28T14:45:00.000Z',
        alert: false,
      },
    },
  })
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(+id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a track position',
    description: 'Removes a track position record from the system.',
  })
  @ApiParam({
    name: 'id',
    description: 'The track position ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Track deleted successfully',
    schema: {
      example: {
        id: 1,
        deviceId: 'vehicle-1',
        latitude: -23.54,
        longitude: -46.62,
        timestamp: '2026-05-28T14:45:00.000Z',
        alert: false,
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.trackService.remove(+id);
  }
}
