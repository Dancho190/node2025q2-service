import { Injectable, NotFoundException , ForbiddenException } from "@nestjs/common";
import { User } from "../models/user";
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class UserService {
  private users: User[] = [ // Захардкоженные юзеры
    {
      id: uuidv4(),
      login: 'alice',
      password: 'password1',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: uuidv4(),
      login: 'bob',
      password: 'password2',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: uuidv4(),
      login: 'charlie',
      password: 'password3',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: uuidv4(),
      login: 'david',
      password: 'password4',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: uuidv4(),
      login: 'eve',
      password: 'password5',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  ];

  getAll() { // возвращаем массив всех юзеров
    return this.users.map(({ password, ...user }) => user);
  }

  getById(id: string) {
    const user = this.users.find((u) => u.id === id) // короче ищем юзера по его айдишнику
    if(!user) throw new NotFoundException()
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword
  }

  findByLogin(login: string) { // метод для authservice
  return this.users.find((u) => u.login === login) || null;
}

  create(dto: Partial<User>) {
    const now = Date.now();
    const user: User = { // все поля что нужно заполнить в post req
      id: uuidv4(),
      login: dto.login!,
      password: dto.password!,
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    this.users.push(user);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  updatePassword(id: string, oldPassword: string, newPassword: string) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException();
    if (user.password !== oldPassword) throw new ForbiddenException();
    
    user.password = newPassword; // заполняем в реквесте новый пассворд в отдельном поле
    user.version += 1; // добавляем 1 к версии
    user.updatedAt = Date.now();
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  delete(id:string) {
    const index = this.users.findIndex((u) => u.id === id)
    if( index === -1) throw NotFoundException
    this.users.splice(index, 1) // Удаление юзера методом сплайс
  }
}