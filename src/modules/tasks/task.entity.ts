import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('text')
    description: string;

    @Column('text')
    status: string;

    @ManyToOne(type => User, user => user.tasks, {eager: false})
    user: User;

    @Column('int')
    userId: number;
}