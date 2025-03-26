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
    return await prisma.formatType.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} formatType`;
  }

  update(id: number, updateFormatTypeDto: UpdateFormatTypeDto) {
    return `This action updates a #${id} formatType`;
  }

  remove(id: number) {
    return `This action removes a #${id} formatType`;
  }
}
