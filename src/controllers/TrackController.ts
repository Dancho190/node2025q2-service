import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  HttpCode, 
  HttpStatus,
  BadRequestException 
} from '@nestjs/common';
import { validate as isUUID } from 'uuid';
import { TrackService } from '../services/track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid track ID');
    }
    return this.trackService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: any) {
    if (!dto.name || !dto.duration) {
      throw new BadRequestException('Name and duration are required');
    }
    if (dto.artistId && !isUUID(dto.artistId)) {
      throw new BadRequestException('Invalid artist ID');
    }
    if (dto.albumId && !isUUID(dto.albumId)) {
      throw new BadRequestException('Invalid album ID');
    }
    return this.trackService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() dto: any) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid track ID');
    }
    if (dto.artistId && !isUUID(dto.artistId)) {
      throw new BadRequestException('Invalid artist ID');
    }
    if (dto.albumId && !isUUID(dto.albumId)) {
      throw new BadRequestException('Invalid album ID');
    }
    return this.trackService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid track ID');
    }
    this.trackService.delete(id);
  }
}