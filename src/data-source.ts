import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./user/user.entity";
import { Post } from "./post/post.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "portfolio_db",
    synchronize: false,
    // logging: true,
    entities: [User, Post],  // 👈 instead of direct imports
    migrations: [__dirname + "/migration/*.ts"], // 👈 important
})

// try {
//     AppDataSource.initialize()
// } catch (error) {
//     console.log(error)
// }