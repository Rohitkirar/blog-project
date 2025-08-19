import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CurrentUserInterceptor } from './interceptor/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core'; 
import { CurrentUserMiddleware } from './middleware/current-user.middleware';

@Module({
  controllers: [UserController],
  providers: [
   UserService, 
   // global interceptor to fetch user and add in request
   // {
   //  provide: APP_INTERCEPTOR,
   //  useClass: CurrentUserInterceptor
   // }
  ],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User])]
})
export class UserModule {
 // register middleware for all routes to add user object if login
 configure(consumer: MiddlewareConsumer){
  consumer.apply(CurrentUserMiddleware).forRoutes("*");
 }
}
