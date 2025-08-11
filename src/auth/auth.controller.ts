import { Controller, Post, Body, Session, BadRequestException } from '@nestjs/common';
import { LoginDto } from './dto/request/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/request/register.dto';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { UserAuthDto } from './dto/response/user-auth.dto';


@Controller('auth')
export class AuthController {
constructor(
 private authService: AuthService
){}

 @Post('register')
 @Serialize(UserAuthDto)
 async register(@Body() body: RegisterDto, @Session() session: any){
  if(session.userId)
   throw new BadRequestException('User already login, please logout first to login again');

  const user = await this.authService.register(body);
  session.userId = user.id;

  return user;
 }

 @Post('login')
 @Serialize(UserAuthDto)
 async login(@Body() body: LoginDto, @Session() session: any){
  if(session.userId)
    throw new BadRequestException('User already login, please logout first to login again');
  
  const user = await this.authService.login(body.email, body.password);
  session.userId = user.id;
  
  return user;
 }

 @Post('logout')
 logout(@Session() session: any){
  session.userId = null;
  return { message: "logout successfully"};
 }
}
