import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{
 constructor(private userService: UserService){}
 async intercept(context:ExecutionContext, handler: CallHandler){
  const request = context.switchToHttp().getRequest();
  if(request.session.userId){
   request.currentUser = await this.userService.findOne(request.session.userId);
  }
  return handler.handle();
 }
}