import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";

import { validatePassword } from '../auth/helpers/password';
import { Task } from "../tasks/task.entity";

@Entity()
// @Unique(['username', 'email']) -- unque decorator on enity which gets columns array
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', unique: true})
    username: string;

    @Column('text')
    password: string;

    @Column('text')
    salt: string;

    @OneToMany(type => Task, task => task.user, {eager: true}) // when eager is true, we can access user.tasks immediately
    tasks: Task[];

    async validatePassword(password: string): Promise<boolean> {
        return await validatePassword(password, this);
    }
}