import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
@Injectable()
export class UserService {
 constructor(@InjectRepository(User) private repo: Repository<User>){}
 find(){
  return this.repo.find();
 }
 findOneByEmail(email: string){
  return this.repo.findOne({where:{email}});
 }
 
 findOne(id: number){
  return this.repo.findOne({where: {id}});
 }

 create(attributes:Partial<User>){
  const user =  this.repo.create(attributes);
  return this.repo.save(user);
 }
 
 async update(id: number, attributes: Partial<User>){
  const user = await this.findOne(id);
  if(!user)
    throw new NotFoundException('user not found');
  Object.assign(user, attributes);
  return this.repo.save(user);
 }
 
 async remove(id:number){
  const user = await this.findOne(id);
  if(!user)
    throw new NotFoundException('user not found');
  return this.repo.remove(user);
 }
}
