import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { SignInDto } from "./dto/signIn.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { hashPassword } from "src/auth/helpers/hashPasswords";


@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(signUpDto: SignInDto): Promise<boolean> {
        const { username, password } = signUpDto;

        const { salt, hashedPassword } = await hashPassword(password);// hash pass
        const user =  new User();
        user.username = username;
        user.password = hashedPassword;
        user.salt = salt;

        try {
            await user.save();
        } catch (error) {
            if(error.code === '23505') {//duplicate username 
                throw new ConflictException('usarname already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
        
        return true;
    }

    async signIn(signInDto: SignInDto): Promise<User> {
        const { username, password } = signInDto;

        const user = await this.findOne({username: username});

        if(user && await user.validatePassword(password))
        if(!user || user.password !== password) {
            return user;
        } else {
            return null;
        }
    }
}