import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { SignInDto } from "./dto/signIn.dto";
import { BadRequestException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(signUpDto: SignInDto): Promise<boolean> {
        const { username, password } = signUpDto;

        const user =  new User();
        user.username = username;
        user.password = password;

        await user.save();

        return true;
    }

    async signIn(signInDto: SignInDto): Promise<string> {
        const { username, password } = signInDto;

        const user = await this.findOne({username: username});

        if(!user || user.password !== password) {
            throw new BadRequestException('invalid credentials');
        }

        return 'str';
    }
}