import { BadRequestException, Injectable, NotFoundException, Session, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { randomBytes ,scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { RegisterDto } from './dto/request/register.dto';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
 constructor(private userService: UserService, private jwtService: JwtService){};
 
 async login(email, password){
  const user = this.validateUser(email, password);
  if(!user) throw new UnauthorizedException();
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
  newUser.accessToken = this.generateAccessToken(newUser).accessToken;
  return newUser;
 }

 public generateAccessToken(user: User){
   const payload = {
    sub: user.id,
    email: user.email
   };
   return { accessToken: this.jwtService.sign(payload) };
 }

 public async validateUser(email: string, password: string){
  const user = await this.userService.findOneByEmail(email);
  if(!user) return null;  
  const [salt, storedHash] = user.password.split('.');
  const hash = await scrypt(password, salt, 32) as Buffer;
  if(hash.toString('hex') !== storedHash) return null;
  return user;
 }
}
