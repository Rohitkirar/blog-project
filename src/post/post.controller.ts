import { Injectable, Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/request/create-post.dto';
import { UpdatePostDto } from './dto/request/update-post.dto';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { PostDto } from './dto/response/post.dto';
import { CurrentUser } from 'src/user/decorator/current-user.decorator';
import { User } from 'src/user/user.entity';
import { AuthGuard } from 'src/guard/auth.guard';

@Injectable()
@Serialize(PostDto)
@UseGuards(AuthGuard)
@Controller('posts')
export class PostController {
 constructor(private postService: PostService){}

 @Get()
 index(){
  return this.postService.find();
 }

 @Get("/:id")
 async show(@Param("id") id: number, @CurrentUser() user: User){
  const post = await this.postService.findOne(id);
  if(!post)
   throw new NotFoundException("Post not found!");
  return post;
 }

 @Post()
 store(@Body() body: CreatePostDto, @CurrentUser() user: User){
  return this.postService.create(body, user);
 }

 @Put("/:id")
 update(@Param("id") id: number, @Body() body: UpdatePostDto){
  return this.postService.update(id, body);
 }

 @Delete("/:id")
 destroy(@Param("id") id: number){
  return this.postService.remove(id);
 }
}
