import { Controller, Get, Post, Put, Delete, Body, Param ,HttpCode, HttpStatus } from '@nestjs/common';
import { ArtistService } from '../services/artist.service';

@Controller('artist')  // роут к артист
export class ArtistController {
  constructor(private artistService: ArtistService) {}  

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() { // При гет запросе вызываем эту функцию с сервиса
    return this.artistService.getAll();
  }

  @Get(':id') // с айдишником вызываем другую
  @HttpCode(HttpStatus.OK)
  getById(@Param('id') id: string) {
    return this.artistService.getById(id);
  }

  @Post() // при посте криейт
  @HttpCode(HttpStatus.OK)
  create(@Body() dto: any) {
    return this.artistService.create(dto);
  }

  @Put(':id') // при путе апдейт
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() dto: any) {
    return this.artistService.update(id, dto);
  }

  @Delete(':id') // при делите делит
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string) {
    this.artistService.delete(id);
  }
}