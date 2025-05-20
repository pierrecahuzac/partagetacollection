import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'express';
// @ts-ignore
@Controller('/api/file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) { }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any, @Req() req: Response) {

    // @ts-ignore
    if (!req.user.sub) {
      return;
    }
    // @ts-ignore
    if (!req.query.collectionId) {


      // @ts-ignore
      const itemId = req.query.itemId;
      return this.fileUploadService.uploadCollectionCovers(file, itemId);
    }
    // @ts-ignore
    else if (!req.query.itemId) {

      // @ts-ignore
      const collectionId = req.query.collectionId;
      return this.fileUploadService.uploadCollectionCovers(file, collectionId);
    }
    // @ts-ignore
  }


  @Get()
  findAll() {
    return this.fileUploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileUploadService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileUploadDto: UpdateFileUploadDto,
  ) {
    return this.fileUploadService.update(+id, updateFileUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileUploadService.remove(+id);
  }
}
