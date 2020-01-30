import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('signUp')
    signUp(@Body(ValidationPipe) signUpDto: SignInDto): Promise<boolean> {
        return this.authService.signUp(signUpDto);
    }

    @Post('signIn')
    signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<string> {
        return this.authService.signIn(signInDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req) {
        console.log(req);
    }
}
