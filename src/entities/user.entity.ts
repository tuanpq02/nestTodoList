import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity";
import * as bcrypt from "bcrypt";
import { Role } from "src/auth/enums/role.enum";

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
    role: Role;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    password: string;

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task [];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}