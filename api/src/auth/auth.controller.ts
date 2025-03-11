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
import { AuthGuard } from './auth.guard';
import { Public } from './decorators/public.decorators';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  // @Public()
  @Post('signin')
  @Public()
  async signIn(
    @Body() SigninDTO: SigninDTO,
    @Res(/* { passthrough: true } */) res: Response,
  ): Promise<object> {
    const result = await this.authService.signIn(SigninDTO);
    res.cookie("access_token", result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.json({ message: 'User connected' });
  }
  //@UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Post('signup')
  async signup(@Body() SignupDTO: SignupDTO): Promise<any> {
    if (
      !SignupDTO.email ||
      !SignupDTO.password ||
      (!SignupDTO.confirmPassword && !SignupDTO.username)
    ) {
      throw new BadRequestException(
        'Informations (email, password, username) are required',
      );
    }
    if (SignupDTO.password !== SignupDTO.confirmPassword) {
      throw new BadRequestException('Passwords must be identicals');
    }
    const user = await this.authService.signUp(SignupDTO);
    console.log(user);
    return;
  }
  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
