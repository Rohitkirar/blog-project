import {
 NestInterceptor,
 UseInterceptors,
 ExecutionContext,
 CallHandler
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';

// for class type validation
interface ClassConstructor {
 new (...args:any[]): {};
}

// custom decorator
export function Serialize(dto: ClassConstructor){
 return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{
 
 constructor(private dto: any){}

 intercept(context: ExecutionContext, next: CallHandler) : Observable<any>{
  // console.log("execute immediately when request receive before handling", context);
  
  return next.handle().pipe(
   map((data:any) => {
    // console.log("execute before sending response back" , data);
    return plainToClass(this.dto, data, {
     excludeExtraneousValues: true
    });
   })
  );
 };
}