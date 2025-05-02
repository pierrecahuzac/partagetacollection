import { Injectable } from '@nestjs/common';
import { CreateFormatTypeDto } from './dto/create-format-type.dto';
import { UpdateFormatTypeDto } from './dto/update-format-type.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
@Injectable()
export class FormatTypeService {
  create(createFormatTypeDto: CreateFormatTypeDto) {
    return 'This action adds a new formatType';
  }

  async findAll() {
    try {
      return await prisma.formatType.findMany()
    } catch (error) {
      console.log(error);
      console.log(error);
    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} formatType`;
  }

  async update(id: number, updateFormatTypeDto: UpdateFormatTypeDto) {
    return `This action updates a #${id} formatType`;
  }

  remove(id: number) {
    return `This action removes a #${id} formatType`;
  }
}
