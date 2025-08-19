import { Injectable, UseGuards, NotFoundException } from '@nestjs/common';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { SearchPostDto } from './dto/request/search-post.dto';

@Injectable()
@UseGuards(AuthGuard)
export class PostService {
 constructor(@InjectRepository(Post) private repo: Repository<Post>){}
 
 searchPosts({ search, startDate, endDate}: SearchPostDto){
  const query = this.repo.createQueryBuilder("post").innerJoinAndSelect("post.user", "user");
  if(search)
   query.andWhere("post.title LIKE :search", {search: `%${search}%`});
  if(startDate)
   query.andWhere("post.createdAt >= :startDate", {startDate});
  if(endDate)
   query.andWhere("post.createdAt <= :endDate", {endDate});
  return query.orderBy("post.id", "DESC").getMany();
 }

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
