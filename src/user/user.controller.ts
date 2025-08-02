import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  @Get()
  getUserList(){
   return [];
  }
 
  @Get("/:id")
  getUserById(@Param("id") id: string){
   return id;
  }

 @Post()
 createUser(@Body() createUserDto: CreateUserDto){
  return createUserDto;
 }

 @Put("/:id")
 updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto){
  return updateUserDto;
 }

 @Delete("/:id")
 deleteUser(@Param("id") id: string){
  return id;
 }
}
