import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from '../models/track';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  private tracks: Track[] = [ // Захардкоженные треки
    { id: uuidv4(), name: 'Billie Jean', artistId: null, albumId: null, duration: 294 },
    { id: uuidv4(), name: 'Beat It', artistId: null, albumId: null, duration: 258 },
    { id: uuidv4(), name: 'Thriller', artistId: null, albumId: null, duration: 357 },
    { id: uuidv4(), name: 'Smooth Criminal', artistId: null, albumId: null, duration: 257 },
    { id: uuidv4(), name: 'Bad', artistId: null, albumId: null, duration: 246 },
  ];

  getAll() {
    return this.tracks;
  }

  getById(id: string) {
    const track = this.tracks.find((t) => t.id === id);
    if (!track) throw new NotFoundException();
    return track;
  }

  create(dto: Partial<Track>) {
    const track: Track = {
      id: uuidv4(),
      name: dto.name!,
      artistId: dto.artistId || null,
      albumId: dto.albumId || null,
      duration: dto.duration!,
    };
    this.tracks.push(track);
    return track;
  }

  update(id: string, dto: Partial<Track>) { // Update
    const track = this.getById(id);
    if (dto.name) track.name = dto.name;
    if (dto.duration) track.duration = dto.duration;
    if (dto.artistId !== undefined) track.artistId = dto.artistId;
    if (dto.albumId !== undefined) track.albumId = dto.albumId;
    return track;
  }

  delete(id: string) { // Deletion
    const index = this.tracks.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException(); // Fallback
    this.tracks.splice(index, 1);
  }
}