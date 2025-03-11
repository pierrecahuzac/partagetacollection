import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { SignupDTO } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(SigninDTO) {

    try {
      const { email, password } = SigninDTO;
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });



      if (user) {
        const comparePassword = bcrypt.compareSync(password, user.password);
   
        if (comparePassword !== true) {
          throw new UnauthorizedException();
        }
        delete user.password;
        const payload: { sub: string; username: string; email: string } = {
          sub: user.id,
          username: user.username,
          email: user.email,
        };
        const access_token = await this.jwtService.signAsync(payload);
        return {
          access_token,
        };
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  }
  
  async signup(SignupDTO: SignupDTO) {
    console.log(SignupDTO);    
    if (!SignupDTO.email || !SignupDTO.password || !SignupDTO.username) {
      throw new BadRequestException(
        'Email, password and username are required',
      );
    }
    const userExists = await prisma.user.findUnique({
      where: {
        email: SignupDTO.email,
      },
    });
    if (userExists) {
      throw new BadRequestException('Email already exists');
    }
    const user = await prisma.user.create(
      {
        data: {
          email: SignupDTO.email,
          password: bcrypt.hashSync(SignupDTO.password, 10),
          username: SignupDTO.username,
        },
      }
    );
    console.log(user);
    
    return { user, message: 'User created' };
  }
  async remove(userId) {
    if (!userId) {
      throw new BadRequestException("ID's user is required");
    }
    return this.userService.remove(userId);

    // v { message: 'User deleted' };
  }
}
