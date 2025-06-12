import { Injectable } from '@nestjs/common';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ConditionService {
  create(createConditionDto: CreateConditionDto) {
    return 'This action adds a new condition';
  }

  async findAll() {
    try {
      const result = await prisma.condition.findMany()
      console.log(result);
      
      return result
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} condition`;
  }

  update(id: number, updateConditionDto: UpdateConditionDto) {
    return `This action updates a #${id} condition`;
  }

  remove(id: number) {
    return `This action removes a #${id} condition`;
  }
}
