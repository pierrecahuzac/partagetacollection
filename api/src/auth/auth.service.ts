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
import { SigninDTO } from './dto/signin.dto';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }
  async signIn(SigninDTO: SigninDTO) {
    try {
      const { email, password } = SigninDTO;
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        return { message: "no user with this combinaison email/password" }
      }
      
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
        username: user.username
      };

    } catch (err) {
      console.error("Error during signIn process:", err);
      if (err instanceof PrismaClientInitializationError) {
        console.error("Prisma Client Initialization Error:", err);
        return err
      } else {
        console.error("Unexpected error:", err);
        return err
      }


    }
  }

  async signup(SignupDTO: SignupDTO) {
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
    const user = await prisma.user.create({
      data: {
        email: SignupDTO.email,
        password: bcrypt.hashSync(SignupDTO.password, 10),
        username: SignupDTO.username,
      },
    });

    return { user, message: 'User created' };
  }
  // async remove(userId: string) {
  //   try {
  //     if (!userId) {
  //       throw new BadRequestException("ID's user is required");
  //     }
  //     const userExists = await prisma.user.findUnique({
  //       where: { id: userId },
  //     });

  //     if (!userExists) {
  //       throw new BadRequestException("L'utilisateur n'existe pas");
  //     }
  //     await prisma.collectionItem.deleteMany({
  //       where: {
  //         userId
  //       }
  //     })
  //     await prisma.item.deleteMany({
  //       where: {
  //         userId
  //       }
  //     })
  //     await prisma.collection.deleteMany({
  //       where: {
  //         userId
  //       }
  //     })
  //     return this.userService.remove(userId);
  //   } catch (error) {
  //     throw new BadRequestException("Erreur lors de la suppression des éléments de collection ou de l'utilisateur.");
  //   }
  // }
}
