import { Controller, Get, Post, Put, Delete, Body, Param , BadRequestException , HttpCode, HttpStatus} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}  

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.userService.getAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id') id: string) {
    return this.userService.getById(id)
  }

  @Post() // при посте криейт
  @HttpCode(HttpStatus.OK)
  create(@Body() dto: any) {
    return this.userService.create(dto);
  }

  @Put(':id/password')
  @HttpCode(HttpStatus.OK)
  updatePassword(@Param('id') id: string, @Body() dto: any) {
    if (!dto.oldPassword || !dto.newPassword) throw new BadRequestException('Old and new password required'); // BadReq fallback
    return this.userService.updatePassword(id, dto.oldPassword, dto.newPassword); // Сервер не отвечает новым паролем
  }
   
  @Delete(":id") 
  @HttpCode(HttpStatus.OK)
  delete(@Param("id") id:string) {
    return this.userService.delete(id)
  }
}