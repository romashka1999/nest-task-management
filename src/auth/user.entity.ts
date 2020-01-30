import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { validatePassword } from './helpers/hashPasswords';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', unique: true})
    username: string;

    @Column('text')
    password: string;

    @Column('text')
    salt: string;

    async validatePassword(password: string): Promise<boolean> {
        return await validatePassword(password, this);
    }
}