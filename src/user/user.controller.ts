import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserService } from './user.service';
import { UserDto } from './dto/response/user.dto'
import { Serialize, SerializeInterceptor } from 'src/interceptor/serialize.interceptor';
// import { ClassSerializerInterceptor } from 

@Controller('users')
@Serialize(UserDto) // controller level use for all function inside
export class UserController {
 constructor(private userService: UserService){}
  @Get()
  getUserList(){
   return this.userService.find();
  }
 
  @Get("/:id")
  // @UseInterceptors(ClassSerializerInterceptor) // nest recommended interceptor
  // @UseInterceptors(new SerializeInterceptor(UserDto))
  // @Serialize(UserDto) // function level use if separate dto use
  async getUserById(@Param("id") id: string){
   const user = await this.userService.findOne(parseInt(id));
   if(!user)
     throw new NotFoundException('User not found!');
   return user;
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
