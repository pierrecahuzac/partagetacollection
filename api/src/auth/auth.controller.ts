import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  BadRequestException,
  Res,
  HttpStatus,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { SigninDTO } from './dto/signin.dto';
import { SignupDTO } from './dto/signup.dto';

import { Public } from './decorators/public.decorators';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { z } from "zod"
import * as dotenv from 'dotenv';


if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env' });
}

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

    const SigninSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
    });

    const safeParsed = SigninSchema.safeParse(SigninDTO);    
    
    if (!safeParsed.success) {
      return res.status(401).json({ message: 'Données invalides', errors: safeParsed.error.errors });
    }
    const result = await this.authService.signIn(SigninDTO);
    
    
    if ('message' in result) {
      return res
        .status(401)
        .json({ message: 'Combinaison email/mot de passe incorrecte' });
    }
    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.json({ message: 'User connected', username: result.username
    });
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

    const passwordErrorMessage = {
      minLengthErrorMessage: "Le mot de passe doit contenir au moins 8 caractères",
      maxLengthErrorMessage: "Le mot de passe doit contenir au maximum 20 caractères",
      upperCaseErrorMessage: "Le mot de passe doit contenir au moins une majuscule",
      lowerCaseErrorMessage: "Le mot de passe doit contenir au moins une minuscule",
      numberErrorMessage: "Le mot de passe doit contenir au moins un chiffre",
      specialCharacterErrorMessage: "Le mot de passe doit contenir au moins un caractère spécial"

    }
    const passwordSchema = z
      .string()
      .min(8, { message: passwordErrorMessage.minLengthErrorMessage })
      .max(20, { message: passwordErrorMessage.maxLengthErrorMessage })
      .refine((password) => /[A-Z]/.test(password), {
        message: passwordErrorMessage.upperCaseErrorMessage,
      })
      .refine((password) => /[a-z]/.test(password), {
        message: passwordErrorMessage.lowerCaseErrorMessage,
      })
      .refine((password) => /[0-9]/.test(password), { message: passwordErrorMessage.numberErrorMessage })
      .refine((password) => /[!@#$%^&*]/.test(password), {
        message: passwordErrorMessage.specialCharacterErrorMessage,
      });

    const signupSchema = z.object({
      email: z.string().email(),
      password: passwordSchema,
      username: z.string().min(3),
      passwordConfirmation: passwordSchema,
    })
    const safeParsed = signupSchema.safeParse(SignupDTO);

    if (!safeParsed.success) {
      return res.status(401).json({ message: 'Données invalides', errors: safeParsed.error.errors });
    }

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

  // @UseGuards(AuthGuard)
  // @Delete(':id')
  // async remove(@Request() req: any) {
  //   const userId = req.user.sub
  //   const result = await this.authService.remove(userId);
  // }
}
