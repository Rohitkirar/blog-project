import { Module } from '@nestjs/common';
import { ConfigModule , ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { Post } from './post/post.entity';
import { PostModule } from './post/post.module';
import { DataSourceOptions } from 'typeorm';

@Module({
  imports: [
   ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
   }),
   TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService):TypeOrmModuleOptions  => {
     return {
       type: "mysql",
       host: config.getOrThrow("DB_HOST"),
       port: config.getOrThrow("DB_PORT"),
       database: config.getOrThrow("DB_DATABASE"),
       username:  config.getOrThrow("DB_USERNAME"),
       password: config.getOrThrow<string>("DB_PASSWORD"),
       synchronize: true,
       entities: [User, Post]
     };
    }
   }),
  //  TypeOrmModule.forRoot({
  //  type: "mysql",
  //  host: "127.0.0.1",
  //  port: 3306,
  //  database: "portfolio_db",
  //  username: "root",
  //  password: "",
  //  entities: [User, Post],
  //  synchronize: true
  // }),    
  UserModule, 
  AuthModule, 
  PostModule 
 ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
