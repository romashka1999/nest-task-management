import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {}

    signUp(signUpDto: SignUpDto): Promise<boolean> {
        return this.userRepository.signUp(signUpDto);
    }

    signIn(signInDto: SignInDto): Promise<string> {
        return this.userRepository.signIn(signInDto);
    }
}
