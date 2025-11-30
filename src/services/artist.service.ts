import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from '../models/artist';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [ // Захардкоженные Артисты
    { id: uuidv4(), name: 'Michael Jackson', grammy: true },
    { id: uuidv4(), name: 'Madonna', grammy: true },
    { id: uuidv4(), name: 'Prince', grammy: true },
    { id: uuidv4(), name: 'Whitney Houston', grammy: true },
  ];

  getAll() {
    return this.artists;
  }

  getById(id: string) { // Гет юзера
    const artist = this.artists.find((a) => a.id === id);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  create(dto: Partial<Artist>) { // Создание юзера
    const artist: Artist = {
      id: uuidv4(),
      name: dto.name!,
      grammy: dto.grammy!,
    };
    this.artists.push(artist);
    return artist;
  }

  update(id: string, dto: Partial<Artist>) { // Типизированная логика апдейта
    const artist = this.getById(id);
    artist.name = dto.name!;
    artist.grammy = dto.grammy!;
    return artist;
  }

  delete(id: string) {
    const index = this.artists.findIndex((a) => a.id === id);
    if (index === -1) throw new NotFoundException();
    this.artists.splice(index, 1);
  }
}
