import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';



@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}

    signUp(signUpDto: SignUpDto): Promise<boolean> {
        return this.userRepository.signUp(signUpDto);
    }

    async signIn(signInDto: SignInDto): Promise<string> {
        const user = await this.userRepository.signIn(signInDto);

        if(!user) {
            throw new UnauthorizedException('invalid credentials');
        }

        const payload = user;
        const accesToken: string = await this.jwtService.sign(payload);

        return accesToken;
    }
}
