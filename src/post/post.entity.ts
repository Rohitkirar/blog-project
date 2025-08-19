import { } from "class-transformer";
import { timestamp } from "rxjs";
import { User } from "../user/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, Timestamp, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm";

@Entity()
export class Post{
 /* ----------------------Structure---------------------- */

 @PrimaryGeneratedColumn()
 id: number;

 @Column({length: 255})
 title: string;

 @Column()
 content: string;

 @CreateDateColumn({ type: "timestamp", nullable:true })
 createdAt: Date;

 @UpdateDateColumn({ type: "timestamp", nullable:true })
 updatedAt: Date;

 @DeleteDateColumn({ type: "timestamp", nullable:true })
 deletedAt: Date;

 /* ----------------------Relationships---------------------- */
 @ManyToOne(()=>User, (user) => user.posts)
 user: User;
}