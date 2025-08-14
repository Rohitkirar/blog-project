import { Injectable, UseGuards, NotFoundException } from '@nestjs/common';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { AuthGuard } from 'src/guard/auth.guard';

@Injectable()
@UseGuards(AuthGuard)
export class PostService {
 constructor(@InjectRepository(Post) private repo: Repository<Post>){}
 
 find(){
  return this.repo.find();
 }

 findOne(id: number){
  return this.repo.findOne({where: {id}, relations: ["user"]});
 }

 create(attributes: Partial<Post>, user: User){
  const post = this.repo.create(attributes);
  post.user = user;
  return this.repo.save(post);
 }

 async update(id:number, attributes: Partial<Post>){
  const post = await this.findOne(id);
  if(!post)
   throw new NotFoundException("Post not found!");
  Object.assign(post, attributes);
  return this.repo.save(post);
 }

 async remove(id:number){
  const post = await this.findOne(id);
  if(!post)
   throw new NotFoundException("Post not found!");
  return this.repo.remove(post);
 }
}
