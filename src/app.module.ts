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
   type: "mysql",
   host: "127.0.0.1",
   port: 3306,
   database: "portfolio_db",
   username: "root",
   password: "",
   entities: [User],
   synchronize: true
  }) 
 ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
