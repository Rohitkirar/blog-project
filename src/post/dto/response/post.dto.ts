import { Expose, Transform, Type } from "class-transformer";
import { UserDto } from "src/user/dto/response/user.dto";
import { User } from "src/user/user.entity";

export class PostDto{
 @Expose()
 id: number;
 @Expose()
 title: string;
 @Expose()
 content: string;
 @Expose()
 createdAt: Date;
 @Expose()
 updatedAt: Date;
 // @Expose()
 // deletedAt: Date;
 // @Transform(({ obj }) => obj.user  )
 @Expose()
 @Type(() => UserDto)
 user: UserDto ;
}