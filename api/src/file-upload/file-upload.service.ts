import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class FileUploadService {
  // @ts-ignore
  async handleFileUpload(file: Express.Multer.File, entityId: string) {
    console.log("ici");
    
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', , 'image/png', 'application/pdf'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('invalid file type');
    }

    const maxSize = 5 * 1024 * 1024; // 5MB;
    if (file.size > maxSize) {
      throw new BadRequestException('file is too large!');
    }
    
    const fileUrl = `${file.filename}`;
    console.log(fileUrl);    
    const foundedCollection = await prisma.collection.findUnique({
      where: {
        id: entityId,
      },
    });

    if (foundedCollection) {
      const updatedCollection = await prisma.collection.update({
        where: { id: entityId },
        data: { cover: fileUrl },
      });

      return { message: 'Cover updated for collection', updatedCollection };
    }
    // Sinon, on essaie de trouver un item
    const foundItem = await prisma.item.findUnique({
      where: { id: entityId },
    });
    console.log('foundItem', foundItem);
    
    if (foundItem) {      
      const updatedItem = await prisma.item.update({
        where: { id: entityId },
        //@ts-ignore
        data: { cover: fileUrl },
      });

      return { message: 'Cover updated for item', updatedItem };
    }
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
