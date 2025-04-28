import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDTO } from 'src/auth/dto/signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { UserDTO } from 'src/auth/dto/user.dto';

const prisma = new PrismaClient();

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
  async findByEmail(email: string) {
    const user: UserDTO = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return null;
    }
    return user;
  }
  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        role: true,
        collections: true,
        username: true,
      },

      //@ts-ignore
    });


    if (user) {
      //@ts-ignore
      delete user.password;
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(userId: string) {
    try {
      const result = await prisma.user.delete({
        where: {
          id: userId,
        },
      });
      return result;
    } catch (error) {
      throw new BadRequestException('Impossibility to delete user')
    }
  }
}
