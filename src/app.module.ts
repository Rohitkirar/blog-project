import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';

@Module({
  imports: [
   UserModule, 
   AuthModule, 
   TypeOrmModule.forRoot({
   type: "sqlite",
   database: "db.sqlite",
   entities: [User],
   synchronize: true
  }) 
 ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
