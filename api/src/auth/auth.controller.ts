import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Res,
  HttpStatus,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { SigninDTO } from './dto/signin.dto';
import { SignupDTO } from './dto/signup.dto';

import { Public } from './decorators/public.decorators';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { log } from 'console';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('signin')
  async signIn(
    @Body() SigninDTO: SigninDTO,
    @Res() res: Response,
  ): Promise<object> {
    const result = await this.authService.signIn(SigninDTO);
  
    if ('message' in result) {
      return res
        .status(401)
        .json({ message: 'Combinaison email/mot de passe incorrecte' });
    }
    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.json({ message: 'User connected' });
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Request() req, @Res() res: Response) {
    delete req.headers.cookie;


    return res.status(200).json({ message: 'User logout' });

  }

  @Public()
  @Post('signup')
  async signup(
    @Body() SignupDTO: SignupDTO,
    @Res() res: Response,
  ): Promise<any> {


    if (
      !SignupDTO.email ||
      !SignupDTO.password ||
      !SignupDTO.username ||
      !SignupDTO.passwordConfirmation
    ) {
      throw new BadRequestException(
        "Informations (email, mot de passe, confirmation du mot de passe, nom d'utilisateur) are required",
      );
    }
    if (SignupDTO.password !== SignupDTO.passwordConfirmation) {
      throw new BadRequestException('Passwords must be identicals');
    }


    const user = await this.authService.signup(SignupDTO);


    return res.json({ message: 'User created', user });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
