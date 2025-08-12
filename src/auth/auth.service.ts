import { BadRequestException, Injectable, NotFoundException, Session } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { randomBytes ,scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { RegisterDto } from './dto/request/register.dto';
import { User } from 'src/user/user.entity';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
 constructor(private userService: UserService){};
 
 async login(email, password){
  const user = await this.userService.findOneByEmail(email);
  
  if(!user)
   throw new NotFoundException('User not found');
  
  const [salt, storedHash] = user.password.split('.');
  const hash = await scrypt(password, salt, 32) as Buffer;

  if(hash.toString('hex') !== storedHash)
   throw new BadRequestException("Invalid Credentials");
  
  return user;
 }
 
 async register(body: RegisterDto){
  const user = await this.userService.findOneByEmail(body.email);
  
  if(user)
   throw new BadRequestException("User already exists, please login");
  
  const salt = randomBytes(8).toString('hex');
  const hash = (await scrypt(body.password, salt, 32) as Buffer).toString('hex');
  body.password = `${salt}.${hash}`;

  const newUser = await this.userService.create(body);
  newUser.accessToken = this.generateAccessToken(newUser);
  return newUser;
 }

 private generateAccessToken(user: User){
   return "dummy_token";
 }
}
