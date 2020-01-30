import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('signUp')
    @UsePipes(ValidationPipe)
    signUp(@Body() signUpDto: SignInDto): Promise<boolean> {
        return this.authService.signUp(signUpDto);
    }

    @Post('signIn')
    @UsePipes(ValidationPipe)
    signIn(@Body() signInDto: SignInDto): Promise<string> {
        return this.authService.signIn(signInDto);
    }
}
