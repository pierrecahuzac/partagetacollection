import { Injectable } from '@nestjs/common';
import { SignupDTO } from 'src/auth/dto/signup.dto';
import { SigninDTO } from 'src/auth/dto/signin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { UserDTO } from 'src/auth/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
const prisma = new PrismaClient();
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserService {
  async create(SignupDTO: SignupDTO): Promise<UserDTO> {
    return await prisma.user.create({
      data: {
        email: SignupDTO.email,
        password: SignupDTO.password,
        username: SignupDTO.username,
      },
    });
  }
  async findByEmail(email:string) {
    const user: UserDTO = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return null;
    }

    return user;

  /*  const passwordCompare = await bcrypt.compare(
      SigninDTO.password,
      user.password,
    );
    if (!passwordCompare) {
      return null;
    }
    delete user.password;

    const payload: { id: string; username: string; email: string } = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    return {
      message: 'Wrong combinaison email/password',
      // @ts-ignore
      access_token: await this.jwtService.signAsync(payload),
    };
    return user; */
  }
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
