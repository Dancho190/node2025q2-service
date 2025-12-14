import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackService } from './services/track.service';
import { TrackController } from './controllers/TrackController';
import { AlbumService } from './services/album.service';
import { AlbumController } from './controllers/AlbumController';
import { UserService } from './services/user.service';
import { UserController } from './controllers/Usercontroller';
import { ArtistService } from './services/artist.service';
import { ArtistController } from './controllers/ArtistController';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/AuthController';

@Module({
  imports: [],
  // Контроллеры HTTP
  controllers: [AppController, TrackController, AlbumController, UserController, ArtistController, AuthController],
  // Весь функционал и логика
  providers: [AppService, TrackService, AlbumService, UserService, ArtistService, AuthService ],
})
export class AppModule {}
