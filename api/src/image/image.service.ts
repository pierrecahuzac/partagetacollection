import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class ImageService {
  async create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }
  async createMany(imagesData) {
    try {
      const imagesCreated = await prisma.image.createMany({
        data: imagesData
      })
    } catch (error) {
      console.log(error)
    }
  }

  async findAll() {
    try {
      const images = await prisma.image.findMany({
      })
      return images
    } catch (error) {
      console.log(error)
    }
  }

  async findOne(id: string) {
    try {
      const fundedImage = await prisma.image.findUnique({
        where: {
          id
        }
      })
      return fundedImage
    } catch (error) {
      console.log(error)
    }
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
