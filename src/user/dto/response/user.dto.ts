import { Expose, Transform } from "class-transformer"; 
import { Post } from "src/post/post.entity";
export class UserDto{
 @Expose() 
 id:number;
 @Expose()
 name:string;
 @Expose()
 email:string;
 @Expose()
 phoneNumber:string;
 @Expose()
 createdAt: Date;
 @Expose()
 updatedAt: Date;
 @Expose()
 deletedAt: Date;
 @Expose()
 @Transform(({ obj }) => obj.posts)
 post: Post[];
}