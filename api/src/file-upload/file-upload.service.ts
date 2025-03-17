import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
@Injectable()
export class FileUploadService {
     // @ts-ignore
  async handleFileUpload(file: Express.Multer.File, collectionId: string) {
    const foundedCollection = await prisma.collection.findUnique({
      where: {
        id: collectionId,
      },
    });
    if (!foundedCollection) {
      throw new BadRequestException('Collection not found');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('invalid file type');
    }

    // validate file size (e.g., max 5mb)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('file is too large!');
    }
    // const result = await prisma.collection.findUnique({
    //   where: {
    //     id
    //   }
    // })
    console.log(file.path); 
    console.log(file);
    //@ts-ignore
    console.log(file.fileName);
    const updatedCollection = await prisma.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        
        coverURL: file.path,
      },
    });
    console.log(updatedCollection);

    return { message: 'File uploaded successfully', updatedCollection };
  }
  create(createFileUploadDto: CreateFileUploadDto) {
    return 'This action adds a new fileUpload';
  }

  findAll() {
    return `This action returns all fileUpload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileUpload`;
  }

  update(id: number, updateFileUploadDto: UpdateFileUploadDto) {
    return `This action updates a #${id} fileUpload`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileUpload`;
  }
}
