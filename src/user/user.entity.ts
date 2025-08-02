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
 @Column()
 password: string;
}