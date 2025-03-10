import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, JwtService],
})
export class AuthModule {}
