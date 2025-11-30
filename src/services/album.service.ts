import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from '../models/album';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  private albums: Album[] = [ // Захардкоженные альбомы Майкла Джексона    
    { id: uuidv4(), name: 'Thriller', year: 1982, artistId: null },
    { id: uuidv4(), name: 'Bad', year: 1987, artistId: null },
    { id: uuidv4(), name: 'Like a Virgin', year: 1984, artistId: null },
    { id: uuidv4(), name: 'Purple Rain', year: 1984, artistId: null },
  ];

  getAll() {
    return this.albums;
  }

  getById(id: string) {
    const album = this.albums.find((a) => a.id === id);
    if (!album) throw new NotFoundException();
    return album;
  }

  create(dto: Partial<Album>) {
    const album: Album = {
      id: uuidv4(),
      name: dto.name!,
      year: dto.year!,
      artistId: dto.artistId || null, 
    };
    this.albums.push(album);
    return album;
  }

  update(id: string, dto: Partial<Album>) {
    const album = this.getById(id);
    if (dto.name) album.name = dto.name;   
    if (dto.year) album.year = dto.year;      
    if (dto.artistId !== undefined) album.artistId = dto.artistId; 
    return album;
  }

  delete(id: string) {
    const index = this.albums.findIndex((a) => a.id === id);
    if (index === -1) throw new NotFoundException();
    this.albums.splice(index, 1);
  }
}