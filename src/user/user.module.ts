import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CurrentUserInterceptor } from './interceptor/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core'; 

@Module({
  controllers: [UserController],
  providers: [
   UserService, 
   {
    provide: APP_INTERCEPTOR,
    useClass: CurrentUserInterceptor
   }
  ],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User])]
})
export class UserModule {}
