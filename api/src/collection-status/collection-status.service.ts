import { Injectable } from '@nestjs/common';

import { CreateCollectionStatusDto } from './dto/create-collection-status.dto';
import { UpdateCollectionStatusDto } from './dto/update-collection-status.dto';
import { CollectionStatus } from './entities/collection-status.entity';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
@Injectable()
export class CollectionStatusService {
  

  async create(createCollectionStatusDto: CreateCollectionStatusDto): Promise<CollectionStatus> {
    const status = await prisma.collectionStatus.create({
      data: createCollectionStatusDto,
    });
    return status;
  }

  async findAll(): Promise<CollectionStatus[]> {
    const statuses = await prisma.collectionStatus.findMany({
      orderBy: {
        order: 'asc',
      },
    });
    return statuses;
  }

  async findOne(id: string): Promise<CollectionStatus> {
    const status = await prisma.collectionStatus.findUnique({
      where: { id },
    });
    return status;
  }

  async update(id: string, updateCollectionStatusDto: UpdateCollectionStatusDto): Promise<CollectionStatus> {
    const status = await prisma.collectionStatus.update({
      where: { id },
      data: updateCollectionStatusDto,
    });
    return status;
  }

  async remove(id: string): Promise<CollectionStatus> {
    const status = await prisma.collectionStatus.delete({
      where: { id },
    });
    return status;
  }
}
