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
import { AlbumService } from '../services/album.service';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid album ID');
    }
    return this.albumService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: any) {
    if (!dto.name || !dto.year) {
      throw new BadRequestException('Name and year are required');
    }
    if (dto.artistId && !isUUID(dto.artistId)) {
      throw new BadRequestException('Invalid artist ID');
    }
    return this.albumService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() dto: any) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid album ID');
    }
    if (dto.artistId && !isUUID(dto.artistId)) {
      throw new BadRequestException('Invalid artist ID');
    }
    return this.albumService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid album ID');
    }
    this.albumService.delete(id);
  }
}