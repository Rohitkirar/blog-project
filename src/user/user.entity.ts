import { Exclude, Expose } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from "typeorm";
@Entity()
export class User{
 @PrimaryGeneratedColumn()
 id: number;
 @Column()
 name: string;
 @Column()
 phoneNumber: string;
 @Column()
 email: string;
 // @Exclude() // if you are using global interceptor to excude field from response we use this in entity
 @Column()
 password: string;

  // This will not be saved to DB
  @Expose()
  accessToken?: string;
}