import { Controller, Post, Get, Body, Session, BadRequestException, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/request/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/request/register.dto';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { UserAuthDto } from './dto/response/user-auth.dto';
import { User } from 'src/user/user.entity';
import { CurrentUser } from 'src/user/decorator/current-user.decorator';
import { UserDetailDto } from './dto/response/user-detail.dto';
import { AuthGuard } from 'src/guard/auth.guard';


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

 @Get('user')
 @Serialize(UserDetailDto)
 @UseGuards(AuthGuard)
 authUser(@CurrentUser() user: User){
  return user;
 }

 @Post('logout')
 @UseGuards(AuthGuard)
 logout(@Session() session: any){
  session.userId = null;
  return { message: "logout successfully"};
 }
}
