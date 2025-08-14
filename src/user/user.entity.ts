import { Exclude, Expose } from "class-transformer";
import { Post } from "src/post/post.entity";
import { PostModule } from "src/post/post.module";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";
@Entity()
export class User{
 /* ----------------------Structure---------------------- */

 @PrimaryGeneratedColumn()
 id: number;

 @Column({length:100})
 name: string;

 @Column()
 phoneNumber: string;

 @Column()
 email: string;

 // @Exclude() // if you are using global interceptor to excude field from response we use this in entity
 @Column()
 password: string;

 @CreateDateColumn({ type: "timestamp", nullable:true })
 createdAt: Date;

 @UpdateDateColumn({ type: "timestamp", nullable:true })
 updatedAt: Date;

 @DeleteDateColumn({ type: "timestamp", nullable:true })
 deletedAt: Date;

 // This will not be saved to DB
 @Expose()
 accessToken?: string;

 /* ----------------------Relationships---------------------- */
 @OneToMany(() => Post, (post) => post.user)
 posts: Post[];
}