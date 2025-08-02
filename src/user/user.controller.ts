import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { stringify } from 'querystring';

@Controller('users')
export class UserController {
 constructor(private userService: UserService){}
  @Get()
  getUserList(){
   return this.userService.find();
  }
 
  @Get("/:id")
  getUserById(@Param("id") id: string){
   return this.userService.findOne(parseInt(id));
  }

 @Post()
 createUser(@Body() createUserDto: CreateUserDto){
  const data = {
   name: createUserDto.name,
   email: createUserDto.email,
   phoneNumber: createUserDto.phoneNumber,
   password: createUserDto.password
  }
  return this.userService.create(data);
 }

 @Put("/:id")
 updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto){
  const data = {
   email: updateUserDto.email,
   phoneNumber: updateUserDto.phoneNumber,
   name: updateUserDto.name
  };
  return this.userService.update(parseInt(id), data);
 }

 @Delete("/:id")
 deleteUser(@Param("id") id: string){
  return this.userService.remove(parseInt(id));
 }
}
